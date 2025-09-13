import { lazy, Suspense, useEffect, useState } from 'react'
import type { SectionId } from './types/section'
import { Panel } from './ui/Panel'
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
            active={active}
            onSelect={setActive}
            onReady={() => setReady(true)}
          />
        </Suspense>

        <header className="hud">
          <h1 className="hud__name">{profile.name}</h1>
          <p className="hud__role">{profile.role}</p>
        </header>

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
            <button type="button" className="back" onClick={() => setActive(null)}>
              ← Back to room
            </button>
            <Panel section={active} onClose={() => setActive(null)} />
          </>
        ) : (
          <p className="hint">
            {touch
              ? 'Drag to look around · Pinch to zoom · Tap an object'
              : 'Drag to look around · Scroll to zoom · Click an object to explore'}
          </p>
        )}

        <Loader done={ready} />
      </div>
    </ErrorBoundary>
  )
}

export default App
