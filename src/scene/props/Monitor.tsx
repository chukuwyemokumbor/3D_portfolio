import { palette } from '../palette'
import { MONITOR } from '../layout'

/** Monitor, keyboard and mouse on the desk. */
export function Monitor() {
  return (
    <group position={[MONITOR.x, MONITOR.y, MONITOR.z]}>
      {/* Stand */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.36, 0.03, 0.22]} />
        <meshStandardMaterial color={palette.monitorFrame} />
      </mesh>
      <mesh position={[0, 0.2, -0.04]} castShadow>
        <boxGeometry args={[0.06, 0.36, 0.04]} />
        <meshStandardMaterial color={palette.monitorFrame} />
      </mesh>
      {/* Bezel and screen */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <boxGeometry args={[1.2, 0.72, 0.05]} />
        <meshStandardMaterial color={palette.monitorFrame} />
      </mesh>
      <mesh position={[0, 0.62, 0.027]}>
        <planeGeometry args={[1.12, 0.64]} />
        <meshStandardMaterial color={palette.screen} emissive={palette.screen} emissiveIntensity={0.6} />
      </mesh>
      {/* Code-like lines on the screen */}
      {[0.2, 0.1, 0, -0.1, -0.2].map((y, i) => (
        <mesh key={y} position={[-0.42 + (i % 2) * 0.08 + 0.2, 0.62 + y, 0.029]}>
          <planeGeometry args={[0.4 + ((i * 37) % 30) / 100, 0.035]} />
          <meshBasicMaterial color={palette.monitorFrame} transparent opacity={0.55} />
        </mesh>
      ))}
      {/* Keyboard and mouse */}
      <mesh position={[0, 0.015, 0.42]} castShadow>
        <boxGeometry args={[0.8, 0.03, 0.24]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.6, 0.02, 0.44]} castShadow>
        <boxGeometry args={[0.08, 0.04, 0.13]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}
