import { palette } from './palette'
import { DESK } from './layout'

/** A simple desk against the back wall. */
export function Desk() {
  const { x, z, height, width, depth } = DESK
  const legX = width / 2 - 0.1
  const legZ = depth / 2 - 0.1

  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, height, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.07, depth]} />
        <meshStandardMaterial color={palette.desk} />
      </mesh>
      {[-1, 1].flatMap((sx) =>
        [-1, 1].map((sz) => (
          <mesh key={`${sx}${sz}`} position={[sx * legX, height / 2, sz * legZ]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, height, 12]} />
            <meshStandardMaterial color={palette.deskLegs} />
          </mesh>
        )),
      )}
    </group>
  )
}
