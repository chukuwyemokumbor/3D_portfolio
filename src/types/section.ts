export type SectionId = 'projects' | 'about' | 'skills' | 'contact'

export interface Section {
  id: SectionId
  label: string
  /** World position for the floating marker and label. */
  anchor: Vec3
  /** Where the camera flies to for a close-up. */
  view: { position: Vec3; target: Vec3 }
}

type Vec3 = [number, number, number]
