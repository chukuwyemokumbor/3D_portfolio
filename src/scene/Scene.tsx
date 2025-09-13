import { Canvas } from '@react-three/fiber'
import { Experience } from './Experience'
import type { SectionId } from '../types/section'

interface Props {
  night: boolean
  active: SectionId | null
  onSelect: (id: SectionId | null) => void
  onReady: () => void
}

/** The 3D canvas. Loaded lazily so three.js arrives in its own chunk behind the loading screen. */
export default function Scene({ night, active, onSelect, onReady }: Props) {
  return (
    <Canvas
      className="canvas"
      shadows
      flat
      dpr={[1, 2]}
      camera={{ position: [20, 15, 20], fov: 40 }}
      onCreated={() => requestAnimationFrame(onReady)}
      onPointerMissed={() => onSelect(null)}
    >
      <Experience night={night} active={active} onSelect={onSelect} />
    </Canvas>
  )
}
