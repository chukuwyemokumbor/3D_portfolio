import { palette } from './palette'

const PLANKS = Array.from({ length: 15 }, (_, i) => -3.5 + i * 0.5)

/** Floor, two walls (a cut-away corner), a window and a rug. The room spans -4..4 on x and z. */
export function Room() {
  return (
    <group>
      {/* Floor slab with plank lines */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[8, 0.2, 8]} />
        <meshStandardMaterial color={palette.floor} roughness={0.8} />
      </mesh>
      {PLANKS.map((x) => (
        <mesh key={x} rotation-x={-Math.PI / 2} position={[x, 0.002, 0]} receiveShadow>
          <planeGeometry args={[0.025, 8]} />
          <meshStandardMaterial color={palette.floorLine} />
        </mesh>
      ))}

      {/* Back wall */}
      <mesh position={[0, 2, -4.1]} receiveShadow>
        <boxGeometry args={[8.4, 4, 0.2]} />
        <meshStandardMaterial color={palette.wallBack} roughness={0.95} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-4.1, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 8]} />
        <meshStandardMaterial color={palette.wallLeft} roughness={0.95} />
      </mesh>

      {/* Skirting boards */}
      <mesh position={[0, 0.08, -3.98]}>
        <boxGeometry args={[8, 0.16, 0.04]} />
        <meshStandardMaterial color={palette.trim} />
      </mesh>
      <mesh position={[-3.98, 0.08, 0]}>
        <boxGeometry args={[0.04, 0.16, 8]} />
        <meshStandardMaterial color={palette.trim} />
      </mesh>

      <Window />

      {/* Rug with two stripes */}
      <group position={[0.4, 0.01, -1.2]}>
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[3.4, 2.4]} />
          <meshStandardMaterial color={palette.rug} />
        </mesh>
        {[-0.7, 0.7].map((z) => (
          <mesh key={z} rotation-x={-Math.PI / 2} position={[0, 0.002, z]} receiveShadow>
            <planeGeometry args={[3.4, 0.18]} />
            <meshStandardMaterial color={palette.rugStripe} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Window() {
  return (
    <group position={[-3.98, 2.3, 0.6]}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[0.06, 1.6, 2]} />
        <meshStandardMaterial color={palette.trim} />
      </mesh>
      {/* Glass */}
      <mesh position={[0.04, 0, 0]}>
        <boxGeometry args={[0.02, 1.4, 1.8]} />
        <meshStandardMaterial color="#caf0f8" emissive="#caf0f8" emissiveIntensity={0.35} />
      </mesh>
      {/* Cross bars */}
      <mesh position={[0.06, 0, 0]}>
        <boxGeometry args={[0.03, 1.4, 0.06]} />
        <meshStandardMaterial color={palette.trim} />
      </mesh>
      <mesh position={[0.06, 0, 0]}>
        <boxGeometry args={[0.03, 0.06, 1.8]} />
        <meshStandardMaterial color={palette.trim} />
      </mesh>
    </group>
  )
}
