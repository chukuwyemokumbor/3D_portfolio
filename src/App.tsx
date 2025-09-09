import { Canvas } from '@react-three/fiber'
import { Experience } from './scene/Experience'

function App() {
  return (
    <div className="app">
      <Canvas className="canvas" shadows dpr={[1, 2]} camera={{ position: [7, 5.5, 7], fov: 40 }}>
        <Experience />
      </Canvas>

      <header className="hud">
        <h1 className="hud__name">My Portfolio</h1>
        <p className="hud__role">Frontend Developer</p>
      </header>
    </div>
  )
}

export default App
