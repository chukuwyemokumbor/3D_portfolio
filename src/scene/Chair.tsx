import { palette } from './palette'
import { DESK } from './layout'

/** An office chair pulled up to the desk, turned slightly towards the viewer. */
export function Chair() {
  return (
    <group position={[DESK.x + 0.1, 0, DESK.z + 1.05]} rotation-y={0.35}>
      {/* Seat */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.55, 0.09, 0.55]} />
        <meshStandardMaterial color={palette.chair} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.88, 0.25]} castShadow>
        <boxGeometry args={[0.52, 0.6, 0.07]} />
        <meshStandardMaterial color={palette.chair} />
      </mesh>
      {/* Gas lift */}
      <mesh position={[0, 0.27, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.4, 12]} />
        <meshStandardMaterial color={palette.chairBase} />
      </mesh>
      {/* Five-star base */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, 0.06, 0]} rotation-y={(i * Math.PI * 2) / 5}>
          <boxGeometry args={[0.05, 0.04, 0.6]} />
          <meshStandardMaterial color={palette.chairBase} />
        </mesh>
      ))}
    </group>
  )
}
