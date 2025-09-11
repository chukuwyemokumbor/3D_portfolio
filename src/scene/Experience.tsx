import { palette } from './palette'
import { Room } from './Room'
import { Lights } from './Lights'
import { CameraRig } from './CameraRig'
import { Desk } from './Desk'
import { Chair } from './Chair'
import { Monitor } from './props/Monitor'
import { Lamp } from './props/Lamp'
import { Mug } from './props/Mug'
import { Bookshelf } from './props/Bookshelf'
import { Plant } from './props/Plant'
import { Poster } from './props/Poster'
import { Phone } from './props/Phone'

/** Everything inside the 3D canvas. */
export function Experience() {
  return (
    <>
      <color attach="background" args={[palette.background]} />

      <Lights />

      <Room />
      <Desk />
      <Chair />
      <Monitor />
      <Lamp />
      <Mug />
      <Bookshelf />
      <Plant />
      <Poster />
      <Phone />

      <CameraRig />
    </>
  )
}
