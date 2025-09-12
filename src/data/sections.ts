import type { Section, SectionId } from '../types/section'
import { BOOKSHELF, MONITOR, POSTER, SIDE_TABLE } from '../scene/layout'

/** The clickable objects in the room, what they open, and the close-up camera view for each. */
export const SECTION = {
  projects: {
    id: 'projects',
    label: 'Projects',
    anchor: [MONITOR.x, MONITOR.y + 1.25, MONITOR.z],
    view: { position: [MONITOR.x + 0.6, MONITOR.y + 1.15, MONITOR.z + 2.7], target: [MONITOR.x, MONITOR.y + 0.55, MONITOR.z] },
  },
  about: {
    id: 'about',
    label: 'About me',
    anchor: [BOOKSHELF.x + 0.1, 2.4, BOOKSHELF.z],
    view: { position: [BOOKSHELF.x + 3.0, 1.7, BOOKSHELF.z + 0.8], target: [BOOKSHELF.x, 1.05, BOOKSHELF.z] },
  },
  skills: {
    id: 'skills',
    label: 'Skills',
    anchor: [POSTER.x, POSTER.y + 0.95, POSTER.z + 0.15],
    view: { position: [POSTER.x + 0.6, POSTER.y + 0.1, POSTER.z + 2.8], target: [POSTER.x, POSTER.y, POSTER.z] },
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    anchor: [SIDE_TABLE.x, 1.25, SIDE_TABLE.z],
    view: { position: [SIDE_TABLE.x + 0.7, 1.9, SIDE_TABLE.z + 2.0], target: [SIDE_TABLE.x, 0.7, SIDE_TABLE.z] },
  },
} satisfies Record<SectionId, Section>

export const SECTIONS: Section[] = Object.values(SECTION)
