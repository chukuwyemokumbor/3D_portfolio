import { forwardRef, useImperativeHandle, useRef } from 'react'
import type { SectionId } from '../types/section'
import { SECTIONS } from '../data/sections'

export interface SectionNavHandle {
  focus: (id: SectionId) => void
}

interface Props {
  active: SectionId | null
  onSelect: (id: SectionId) => void
}

/** Plain buttons for every section: the keyboard / screen-reader path into the 3D room. */
export const SectionNav = forwardRef<SectionNavHandle, Props>(function SectionNav({ active, onSelect }, ref) {
  const buttons = useRef<Partial<Record<SectionId, HTMLButtonElement | null>>>({})

  useImperativeHandle(ref, () => ({
    focus: (id) => buttons.current[id]?.focus(),
  }))

  return (
    <nav className="section-nav" aria-label="Sections">
      <ul>
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              ref={(el) => {
                buttons.current[s.id] = el
              }}
              className={active === s.id ? 'is-active' : undefined}
              aria-current={active === s.id ? 'true' : undefined}
              aria-keyshortcuts={String(i + 1)}
              onClick={() => onSelect(s.id)}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
})
