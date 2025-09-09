import { OrbitControls } from '@react-three/drei'
import { palette } from './palette'

/** Everything inside the 3D canvas. */
export function Experience() {
  return (
    <>
      <color attach="background" args={[palette.background]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={1.4} />

      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={palette.floor} />
      </mesh>

      {/* Placeholder so there's something to look at until the room is built. */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={palette.accent} />
      </mesh>

      <OrbitControls target={[0, 1, 0]} />
    </>
  )
}
