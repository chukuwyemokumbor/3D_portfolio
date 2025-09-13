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
  night: boolean
  compact: boolean
  /** Touch screens can't hover, so labels stay visible. */
  touch: boolean
  active: SectionId | null
  onSelect: (id: SectionId) => void
}

/** Everything inside the 3D canvas. */
export function Experience({ night, compact, touch, active, onSelect }: Props) {
  const hotspot = (id: SectionId) => ({
    section: SECTION[id],
    active: active === id,
    alwaysShowLabel: touch && active === null,
    onSelect: () => onSelect(id),
  })

  return (
    <>
      <color attach="background" args={[palette.background]} />

      <Lights night={night} />

      <Room night={night} />
      <Desk />
      <Chair />
      <Hotspot {...hotspot('projects')}>
        <Monitor night={night} />
      </Hotspot>
      <Lamp night={night} />
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

      <CameraRig active={active} compact={compact} />
    </>
  )
}
