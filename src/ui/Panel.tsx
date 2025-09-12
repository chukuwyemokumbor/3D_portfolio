import { useEffect, useRef } from 'react'
import type { SectionId } from '../types/section'
import { SECTION } from '../data/sections'
import { profile } from '../data/profile'

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
        {section === 'projects' && <Projects />}
        {section === 'about' && <About />}
        {section === 'skills' && <Skills />}
        {section === 'contact' && <Contact />}
      </div>
    </aside>
  )
}

function Projects() {
  return (
    <ul className="projects">
      {profile.projects.map((p) => (
        <li key={p.title} className="project">
          <h3 className="project__title">{p.title}</h3>
          <p className="project__desc">{p.description}</p>
          <ul className="tags" aria-label="Built with">
            {p.tags.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
          <a className="link" href={p.repo} target="_blank" rel="noreferrer">
            View code on GitHub ↗
          </a>
        </li>
      ))}
    </ul>
  )
}

function About() {
  return (
    <div className="prose">
      {profile.about.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  )
}

function Skills() {
  return (
    <div className="skills">
      {profile.skills.map((g) => (
        <section key={g.group}>
          <h3 className="skills__group">{g.group}</h3>
          <ul className="tags">
            {g.items.map((s) => (
              <li key={s} className="tag tag--big">
                {s}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function Contact() {
  const { email, github, linkedin } = profile.contact
  const links = [
    email && { label: 'Email', value: email, href: `mailto:${email}` },
    github && { label: 'GitHub', value: github.replace('https://', ''), href: github },
    linkedin && { label: 'LinkedIn', value: linkedin.replace('https://', ''), href: linkedin },
  ].filter(Boolean) as { label: string; value: string; href: string }[]

  return (
    <div className="prose">
      <p>Want to work together or just say hi? I&apos;d love to hear from you.</p>
      <ul className="contact">
        {links.map((l) => (
          <li key={l.label}>
            <span className="contact__label">{l.label}</span>
            <a className="link" href={l.href} target={l.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">
              {l.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
