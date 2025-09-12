import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Color, type AmbientLight, type DirectionalLight, type HemisphereLight, type PointLight } from 'three'
import { palette } from './palette'
import { LAMP } from './layout'

const DAY = { hemi: 1.1, ambient: 0.35, sun: 1.6, sunColor: '#ffffff', lamp: 0.8, background: palette.background }
const NIGHT = { hemi: 0.22, ambient: 0.1, sun: 0.35, sunColor: '#9db4ff', lamp: 4.5, background: palette.night }

/** Sky light, a shadow-casting sun (moon at night) and the desk lamp, easing between day and night. */
export function Lights({ night }: { night: boolean }) {
  const hemi = useRef<HemisphereLight>(null)
  const ambient = useRef<AmbientLight>(null)
  const sun = useRef<DirectionalLight>(null)
  const lamp = useRef<PointLight>(null)
  const scene = useThree((s) => s.scene)
  const colors = useRef({ sun: new Color(), background: new Color() })

  useFrame((_, delta) => {
    const goal = night ? NIGHT : DAY
    const t = 1 - Math.exp(-4 * delta)
    const ease = (from: number, to: number) => from + (to - from) * t
    if (hemi.current) hemi.current.intensity = ease(hemi.current.intensity, goal.hemi)
    if (ambient.current) ambient.current.intensity = ease(ambient.current.intensity, goal.ambient)
    if (lamp.current) lamp.current.intensity = ease(lamp.current.intensity, goal.lamp)
    if (sun.current) {
      sun.current.intensity = ease(sun.current.intensity, goal.sun)
      sun.current.color.lerp(colors.current.sun.set(goal.sunColor), t)
    }
    if (scene.background instanceof Color) scene.background.lerp(colors.current.background.set(goal.background), t)
  })

  return (
    <>
      <hemisphereLight ref={hemi} args={['#ffffff', palette.floor, DAY.hemi]} />
      <ambientLight ref={ambient} intensity={DAY.ambient} />
      <directionalLight
        ref={sun}
        position={[6, 10, 5]}
        intensity={DAY.sun}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={1}
        shadow-camera-far={25}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
        shadow-radius={4}
      />
      <pointLight
        ref={lamp}
        position={[LAMP.x + 0.37, LAMP.y + 0.48, LAMP.z]}
        color={palette.lampLight}
        intensity={DAY.lamp}
        distance={5}
        decay={2}
      />
    </>
  )
}
