import { useEffect, useMemo, useRef, type ComponentRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3, type PerspectiveCamera } from 'three'
import type { SectionId } from '../types/section'
import { SECTION } from '../data/sections'

const TARGET = new Vector3(0, 1, -0.8)
/** Where the camera rests, looking into the open corner of the room. Phones need to stand further back. */
const HOME = { position: new Vector3(9.5, 7, 9.5), target: TARGET }
const HOME_COMPACT = { position: new Vector3(19, 14.5, 19), target: TARGET }
const START = new Vector3(20, 15, 20)
const START_COMPACT = new Vector3(28, 21, 28)
/** Higher = snappier. Frame-rate independent via exponential damping. */
const SPEED = 2.2

const UP = new Vector3(0, 1, 0)
/**
 * Close-ups keep the object clear of the panel: panned sideways next to the desktop side panel,
 * and aimed lower so it sits above the phone bottom sheet. Values are fractions of the camera distance.
 */
const PANEL_SHIFT = 0.22
const SHEET_SHIFT = 0.18

interface Props {
  active: SectionId | null
  /** Narrow screen: wider lens, further back, bottom-sheet framing. */
  compact: boolean
  /** Cut straight to each view instead of flying, and skip the intro. */
  reducedMotion: boolean
}

/**
 * Orbit controls with limits, an intro fly-in, and fly-to close-ups for each section.
 * Dragging during a flight cancels it so the user is never fighting the camera.
 */
export function CameraRig({ active, compact, reducedMotion }: Props) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const camera = useThree((s) => s.camera)
  const get = useThree((s) => s.get)
  const animating = useRef(true)

  const goal = useMemo(() => {
    if (!active) return compact ? HOME_COMPACT : HOME
    const { position, target } = SECTION[active].view
    const t = new Vector3(...target)
    const p = new Vector3(...position)
    if (compact) {
      // Step back and up so the object fits the narrow screen without furniture in the way,
      // then aim below it so it sits in the top half, above the bottom sheet.
      p.sub(t).multiplyScalar(1.45).add(t).add(new Vector3(0, 0.6, 0))
      const dist = p.distanceTo(t)
      return { position: p, target: t.sub(new Vector3(0, dist * SHEET_SHIFT, 0)) }
    }
    const dist = p.distanceTo(t)
    const right = t.clone().sub(p).cross(UP).normalize()
    const shift = right.multiplyScalar(dist * PANEL_SHIFT)
    return { position: p.add(shift), target: t.add(shift) }
  }, [active, compact])

  useEffect(() => {
    if (!reducedMotion) camera.position.copy(compact ? START_COMPACT : START)
    controls.current?.target.copy(TARGET)
    // Only on mount; later layout changes animate from wherever the camera is.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera])

  useEffect(() => {
    const cam = get().camera as PerspectiveCamera
    cam.fov = compact ? 50 : 40
    cam.updateProjectionMatrix()
  }, [get, compact])

  useEffect(() => {
    animating.current = true
  }, [goal])

  useFrame((_, delta) => {
    const c = controls.current
    if (!animating.current || !c) return
    const t = reducedMotion ? 1 : 1 - Math.exp(-SPEED * delta)
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
      maxDistance={compact ? 32 : 20}
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
