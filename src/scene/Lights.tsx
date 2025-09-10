import { palette } from './palette'
import { LAMP } from './layout'

/** Soft sky light, a shadow-casting sun, and a warm glow from the desk lamp. */
export function Lights() {
  return (
    <>
      <hemisphereLight args={['#ffffff', palette.floor, 1.1]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 10, 5]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={1}
        shadow-camera-far={25}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
        shadow-radius={4}
      />
      <pointLight
        position={[LAMP.x + 0.37, LAMP.y + 0.48, LAMP.z]}
        color={palette.lampLight}
        intensity={0.8}
        distance={2.5}
        decay={2}
      />
    </>
  )
}
