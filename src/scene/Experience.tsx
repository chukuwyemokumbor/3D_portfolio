import { OrbitControls } from '@react-three/drei'
import { palette } from './palette'
import { Room } from './Room'
import { Desk } from './Desk'
import { Chair } from './Chair'

/** Everything inside the 3D canvas. */
export function Experience() {
  return (
    <>
      <color attach="background" args={[palette.background]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={1.4} />

      <Room />
      <Desk />
      <Chair />

      <OrbitControls target={[0, 1, 0]} />
    </>
  )
}
