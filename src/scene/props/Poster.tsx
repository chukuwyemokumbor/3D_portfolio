import { palette } from '../palette'
import { POSTER } from '../layout'

/** A framed abstract poster on the back wall. */
export function Poster() {
  return (
    <group position={[POSTER.x, POSTER.y, POSTER.z]}>
      <mesh castShadow>
        <boxGeometry args={[1.1, 1.4, 0.04]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[0.96, 1.26]} />
        <meshStandardMaterial color={palette.poster} />
      </mesh>
      <mesh position={[-0.12, 0.2, 0.024]}>
        <circleGeometry args={[0.26, 32]} />
        <meshStandardMaterial color={palette.posterAccent} />
      </mesh>
      <mesh position={[0.14, -0.25, 0.026]} rotation-z={0.5}>
        <planeGeometry args={[0.42, 0.42]} />
        <meshStandardMaterial color={palette.rug} />
      </mesh>
      <mesh position={[0, -0.5, 0.025]}>
        <planeGeometry args={[0.7, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}
