import { useEffect, useMemo, useRef, type ComponentRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import type { SectionId } from '../types/section'
import { SECTION } from '../data/sections'

/** Where the camera rests, looking into the open corner of the room. */
const HOME = { position: new Vector3(9.5, 7, 9.5), target: new Vector3(0, 1, -0.8) }
const START = new Vector3(20, 15, 20)
/** Higher = snappier. Frame-rate independent via exponential damping. */
const SPEED = 2.2

interface Props {
  active: SectionId | null
}

const UP = new Vector3(0, 1, 0)
/** Pans close-ups sideways (as a fraction of the camera distance) so the object sits left of the side panel. */
const PANEL_SHIFT = 0.22

/**
 * Orbit controls with limits, an intro fly-in, and fly-to close-ups for each section.
 * Dragging during a flight cancels it so the user is never fighting the camera.
 */
export function CameraRig({ active }: Props) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const camera = useThree((s) => s.camera)
  const animating = useRef(true)

  const goal = useMemo(() => {
    if (!active) return HOME
    const { position, target } = SECTION[active].view
    const p = new Vector3(...position)
    const t = new Vector3(...target)
    const right = t.clone().sub(p).cross(UP).normalize()
    const shift = right.multiplyScalar(p.distanceTo(t) * PANEL_SHIFT)
    return { position: p.add(shift), target: t.add(shift) }
  }, [active])

  useEffect(() => {
    camera.position.copy(START)
    controls.current?.target.copy(HOME.target)
  }, [camera])

  useEffect(() => {
    animating.current = true
  }, [goal])

  useFrame((_, delta) => {
    const c = controls.current
    if (!animating.current || !c) return
    const t = 1 - Math.exp(-SPEED * delta)
    camera.position.lerp(goal.position, t)
    c.target.lerp(goal.target, t)
    c.update()
    if (camera.position.distanceTo(goal.position) < 0.02 && c.target.distanceTo(goal.target) < 0.02) {
      animating.current = false
    }
  })

  const focused = active !== null
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      // Close-ups are framed shots; orbiting is for the overview.
      enabled={!focused}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={focused ? 1 : 5}
      maxDistance={20}
      minPolarAngle={0.35}
      maxPolarAngle={focused ? Math.PI / 2 : 1.3}
      minAzimuthAngle={0.1}
      maxAzimuthAngle={Math.PI / 2 - 0.1}
      onStart={() => {
        animating.current = false
      }}
    />
  )
}
