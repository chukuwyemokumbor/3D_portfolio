import { palette } from '../palette'
import { LAMP } from '../layout'

/** An angled desk lamp. */
export function Lamp() {
  return (
    <group position={[LAMP.x, LAMP.y, LAMP.z]}>
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.04, 24]} />
        <meshStandardMaterial color={palette.lamp} />
      </mesh>
      <mesh position={[0.06, 0.28, 0]} rotation-z={-0.25} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.52, 10]} />
        <meshStandardMaterial color={palette.lamp} />
      </mesh>
      <mesh position={[0.2, 0.55, 0]} rotation-z={0.9} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.34, 10]} />
        <meshStandardMaterial color={palette.lamp} />
      </mesh>
      {/* Shade, pointing down at the desk */}
      <mesh position={[0.34, 0.58, 0]} rotation-z={-2.3} castShadow>
        <coneGeometry args={[0.12, 0.2, 24, 1, true]} />
        <meshStandardMaterial color={palette.lamp} side={2} />
      </mesh>
      <mesh position={[0.37, 0.53, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={palette.lampLight} emissive={palette.lampLight} emissiveIntensity={1} />
      </mesh>
    </group>
  )
}
