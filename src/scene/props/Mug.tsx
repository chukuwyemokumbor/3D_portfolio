import { palette } from '../palette'
import { MUG } from '../layout'

export function Mug() {
  return (
    <group position={[MUG.x, MUG.y, MUG.z]}>
      <mesh position={[0, 0.07, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.055, 0.14, 20]} />
        <meshStandardMaterial color={palette.mug} />
      </mesh>
      <mesh position={[0.07, 0.075, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.035, 0.012, 8, 16]} />
        <meshStandardMaterial color={palette.mug} />
      </mesh>
    </group>
  )
}
