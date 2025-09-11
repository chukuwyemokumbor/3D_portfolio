export type SectionId = 'projects' | 'about' | 'skills' | 'contact'

export interface Section {
  id: SectionId
  label: string
  /** World position for the floating marker and label. */
  anchor: [number, number, number]
}
