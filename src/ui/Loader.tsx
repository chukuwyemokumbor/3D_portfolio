import { useState } from 'react'

/** Full-screen loading cover that fades out once the scene has rendered. */
export function Loader({ done }: { done: boolean }) {
  const [gone, setGone] = useState(false)
  if (gone) return null

  return (
    <div
      className={done ? 'loader loader--done' : 'loader'}
      role="status"
      aria-live="polite"
      onTransitionEnd={() => done && setGone(true)}
    >
      <div className="loader__cube" aria-hidden="true" />
      <p>{done ? 'Ready' : 'Building the room…'}</p>
      <div className="loader__bar" aria-hidden="true">
        <span />
      </div>
    </div>
  )
}
