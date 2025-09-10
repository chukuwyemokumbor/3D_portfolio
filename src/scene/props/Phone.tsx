import { palette } from '../palette'
import { SIDE_TABLE } from '../layout'

/** A small side table with a retro phone on it. */
export function Phone() {
  const tableHeight = 0.6
  return (
    <group position={[SIDE_TABLE.x, 0, SIDE_TABLE.z]}>
      <mesh position={[0, tableHeight, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 32]} />
        <meshStandardMaterial color={palette.desk} />
      </mesh>
      <mesh position={[0, tableHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, tableHeight, 12]} />
        <meshStandardMaterial color={palette.deskLegs} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.04, 24]} />
        <meshStandardMaterial color={palette.deskLegs} />
      </mesh>
      <group position={[0, tableHeight + 0.025, 0]} rotation-y={-0.6}>
        {/* Body */}
        <mesh position={[0, 0.07, 0]} castShadow>
          <boxGeometry args={[0.3, 0.14, 0.24]} />
          <meshStandardMaterial color={palette.chair} />
        </mesh>
        {/* Dial */}
        <mesh position={[0, 0.142, 0.03]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[0.07, 24]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Handset */}
        <mesh position={[0, 0.17, -0.07]} rotation-z={Math.PI / 2} castShadow>
          <capsuleGeometry args={[0.03, 0.26, 6, 12]} />
          <meshStandardMaterial color={palette.chair} />
        </mesh>
      </group>
    </group>
  )
}
