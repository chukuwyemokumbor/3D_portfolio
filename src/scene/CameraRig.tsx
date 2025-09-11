import { useEffect, useRef, type ComponentRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'

/** Where the camera rests, looking into the open corner of the room. */
const HOME = { position: new Vector3(9.5, 7, 9.5), target: new Vector3(0, 1, -0.8) }
const START = new Vector3(20, 15, 20)
/** Higher = snappier. Frame-rate independent via exponential damping. */
const SPEED = 2.2

/**
 * Orbit controls with limits, plus an intro fly-in from far away.
 * Dragging during the intro cancels it so the user is never fighting the camera.
 */
export function CameraRig() {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const camera = useThree((s) => s.camera)
  const animating = useRef(true)

  useEffect(() => {
    camera.position.copy(START)
    controls.current?.target.copy(HOME.target)
  }, [camera])

  useFrame((_, delta) => {
    const c = controls.current
    if (!animating.current || !c) return
    const t = 1 - Math.exp(-SPEED * delta)
    camera.position.lerp(HOME.position, t)
    c.target.lerp(HOME.target, t)
    c.update()
    if (camera.position.distanceTo(HOME.position) < 0.02) animating.current = false
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={5}
      maxDistance={20}
      minPolarAngle={0.35}
      maxPolarAngle={1.3}
      minAzimuthAngle={0.1}
      maxAzimuthAngle={Math.PI / 2 - 0.1}
      onStart={() => {
        animating.current = false
      }}
    />
  )
}
