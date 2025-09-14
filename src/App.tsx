import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { SectionId } from './types/section'
import { Panel } from './ui/Panel'
import { SectionNav, type SectionNavHandle } from './ui/SectionNav'
import { SECTIONS } from './data/sections'
import { Loader } from './ui/Loader'
import { Fallback } from './ui/Fallback'
import { ErrorBoundary } from './ui/ErrorBoundary'
import { profile } from './data/profile'
import { hasWebGL } from './lib/webgl'
import { useMediaQuery } from './lib/useMediaQuery'

const Scene = lazy(() => import('./scene/Scene'))
const webgl = hasWebGL()

function App() {
  const [active, setActive] = useState<SectionId | null>(null)
  const [night, setNight] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [ready, setReady] = useState(false)
  const compact = useMediaQuery('(max-width: 640px)')
  const touch = useMediaQuery('(pointer: coarse)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const nav = useRef<SectionNavHandle>(null)

  /** Close the panel and put keyboard focus back on that section's menu button. */
  function close() {
    if (active) nav.current?.focus(active)
    setActive(null)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const index = active ? SECTIONS.findIndex((s) => s.id === active) : -1
      if (e.key === 'Escape' && active) {
        nav.current?.focus(active)
        setActive(null)
      } else if (/^[1-4]$/.test(e.key)) {
        setActive(SECTIONS[Number(e.key) - 1].id)
      } else if (active && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        const step = e.key === 'ArrowRight' ? 1 : -1
        setActive(SECTIONS[(index + step + SECTIONS.length) % SECTIONS.length].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  if (!webgl) {
    return <Fallback reason="Your browser can't display the 3D room, so here's the classic version." />
  }

  return (
    <ErrorBoundary fallback={<Fallback reason="The 3D room couldn't load on this device, so here's the classic version." />}>
      <div className="app" data-theme={night ? 'night' : 'day'}>
        <Suspense fallback={null}>
          <Scene
            night={night}
            compact={compact}
            touch={touch}
            reducedMotion={reducedMotion}
            active={active}
            onSelect={setActive}
            onReady={() => setReady(true)}
          />
        </Suspense>

        <header className="hud">
          <h1 className="hud__name">{profile.name}</h1>
          <p className="hud__role">{profile.role}</p>
        </header>

        <SectionNav ref={nav} active={active} onSelect={setActive} />

        {!active && (
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setNight((n) => !n)}
            aria-label={night ? 'Switch to day' : 'Switch to night'}
            title={night ? 'Switch to day' : 'Switch to night'}
          >
            <span aria-hidden="true">{night ? '☀' : '☾'}</span>
          </button>
        )}

        {active ? (
          <>
            <button type="button" className="back" onClick={close}>
              ← Back to room
            </button>
            <Panel section={active} onClose={close} />
          </>
        ) : (
          <p className="hint">
            {touch
              ? 'Drag to look around · Pinch to zoom · Tap an object'
              : 'Drag to look around · Scroll to zoom · Click an object or press 1–4'}
          </p>
        )}

        <Loader done={ready} />
      </div>
    </ErrorBoundary>
  )
}

export default App
