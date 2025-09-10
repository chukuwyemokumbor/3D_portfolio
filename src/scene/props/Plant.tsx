import { palette } from '../palette'
import { PLANT } from '../layout'

const LEAVES: [number, number, number, number][] = [
  [0, 0.95, 0, 0.32],
  [0.18, 0.8, 0.1, 0.24],
  [-0.16, 0.82, -0.08, 0.26],
  [0.05, 1.18, -0.05, 0.22],
  [-0.08, 1.05, 0.15, 0.2],
]

/** A potted plant in the back corner. */
export function Plant() {
  return (
    <group position={[PLANT.x, 0, PLANT.z]}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.22, 0.5, 24]} />
        <meshStandardMaterial color={palette.pot} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#6b4f2a" />
      </mesh>
      {LEAVES.map(([x, y, z, r]) => (
        <mesh key={`${x}${y}`} position={[x, y, z]} castShadow>
          <icosahedronGeometry args={[r, 0]} />
          <meshStandardMaterial color={palette.leaves} flatShading />
        </mesh>
      ))}
    </group>
  )
}
