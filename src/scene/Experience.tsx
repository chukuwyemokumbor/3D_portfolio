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
import { Hotspot } from './Hotspot'
import { SECTION } from '../data/sections'
import type { SectionId } from '../types/section'

interface Props {
  active: SectionId | null
  onSelect: (id: SectionId) => void
}

/** Everything inside the 3D canvas. */
export function Experience({ active, onSelect }: Props) {
  const hotspot = (id: SectionId) => ({
    section: SECTION[id],
    active: active === id,
    onSelect: () => onSelect(id),
  })

  return (
    <>
      <color attach="background" args={[palette.background]} />

      <Lights />

      <Room />
      <Desk />
      <Chair />
      <Hotspot {...hotspot('projects')}>
        <Monitor />
      </Hotspot>
      <Lamp />
      <Mug />
      <Hotspot {...hotspot('about')}>
        <Bookshelf />
      </Hotspot>
      <Plant />
      <Hotspot {...hotspot('skills')}>
        <Poster />
      </Hotspot>
      <Hotspot {...hotspot('contact')}>
        <Phone />
      </Hotspot>

      <CameraRig active={active} />
    </>
  )
}
