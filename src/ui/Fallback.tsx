import { SECTIONS } from '../data/sections'
import { profile } from '../data/profile'
import { SectionContent } from './SectionContent'

/** A plain 2D version of the portfolio for browsers that can't show the 3D room. */
export function Fallback({ reason }: { reason: string }) {
  return (
    <main className="fallback">
      <header className="fallback__header">
        <h1>{profile.title}</h1>
        <p className="fallback__note">{reason}</p>
      </header>
      {SECTIONS.map((s) => (
        <section key={s.id} className="fallback__section" aria-labelledby={`fb-${s.id}`}>
          <h2 id={`fb-${s.id}`}>{s.label}</h2>
          <SectionContent section={s.id} />
        </section>
      ))}
    </main>
  )
}
