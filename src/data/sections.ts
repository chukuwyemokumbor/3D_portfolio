import type { Section, SectionId } from '../types/section'
import { BOOKSHELF, MONITOR, POSTER, SIDE_TABLE } from '../scene/layout'

/** The clickable objects in the room and what they open. */
export const SECTION = {
  projects: { id: 'projects', label: 'Projects', anchor: [MONITOR.x, MONITOR.y + 1.25, MONITOR.z] },
  about: { id: 'about', label: 'About me', anchor: [BOOKSHELF.x + 0.1, 2.4, BOOKSHELF.z] },
  skills: { id: 'skills', label: 'Skills', anchor: [POSTER.x, POSTER.y + 0.95, POSTER.z + 0.15] },
  contact: { id: 'contact', label: 'Contact', anchor: [SIDE_TABLE.x, 1.25, SIDE_TABLE.z] },
} satisfies Record<SectionId, Section>

export const SECTIONS: Section[] = Object.values(SECTION)
