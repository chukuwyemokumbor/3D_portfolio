import { useEffect, useRef } from 'react'
import type { SectionId } from '../types/section'
import { SECTION } from '../data/sections'
import { SectionContent } from './SectionContent'

interface Props {
  section: SectionId
  onClose: () => void
}

/** Side panel with the content for the object the camera is focused on. */
export function Panel({ section, onClose }: Props) {
  const heading = useRef<HTMLHeadingElement>(null)

  // Move focus into the panel so keyboard and screen-reader users land on the new content.
  useEffect(() => {
    heading.current?.focus()
  }, [section])

  return (
    <aside className="panel" aria-labelledby="panel-title">
      <div className="panel__head">
        <h2 id="panel-title" className="panel__title" ref={heading} tabIndex={-1}>
          {SECTION[section].label}
        </h2>
        <button type="button" className="panel__close" onClick={onClose} aria-label="Close and go back to the room">
          ✕
        </button>
      </div>
      <div className="panel__body">
        <SectionContent section={section} />
      </div>
    </aside>
  )
}
