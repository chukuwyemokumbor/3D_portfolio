import { Canvas } from '@react-three/fiber'
import { Experience } from './Experience'
import type { SectionId } from '../types/section'

interface Props {
  night: boolean
  compact: boolean
  touch: boolean
  active: SectionId | null
  onSelect: (id: SectionId | null) => void
  onReady: () => void
}

/** The 3D canvas. Loaded lazily so three.js arrives in its own chunk behind the loading screen. */
export default function Scene({ night, compact, touch, active, onSelect, onReady }: Props) {
  return (
    <Canvas
      className="canvas"
      shadows
      flat
      // Cap pixel ratio on phones: sharp enough, and much lighter on the GPU.
      dpr={compact ? [1, 1.5] : [1, 2]}
      camera={{ position: [20, 15, 20], fov: 40 }}
      onCreated={() => requestAnimationFrame(onReady)}
      onPointerMissed={() => onSelect(null)}
    >
      <Experience night={night} compact={compact} touch={touch} active={active} onSelect={onSelect} />
    </Canvas>
  )
}
