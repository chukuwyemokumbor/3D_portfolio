import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Experience } from './scene/Experience'
import type { SectionId } from './types/section'
import { Panel } from './ui/Panel'
import { profile } from './data/profile'

function App() {
  const [active, setActive] = useState<SectionId | null>(null)
  const [night, setNight] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="app" data-theme={night ? 'night' : 'day'}>
      <Canvas
        className="canvas"
        shadows
        flat
        dpr={[1, 2]}
        camera={{ position: [20, 15, 20], fov: 40 }}
        onPointerMissed={() => setActive(null)}
      >
        <Experience night={night} active={active} onSelect={setActive} />
      </Canvas>

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
        <p className="hint">Drag to look around · Scroll to zoom · Click an object to explore</p>
      )}
    </div>
  )
}

export default App
