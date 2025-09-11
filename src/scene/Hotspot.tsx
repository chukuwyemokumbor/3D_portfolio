import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useCursor } from '@react-three/drei'
import type { Group, Mesh, MeshStandardMaterial, Object3D } from 'three'
import type { Section } from '../types/section'
import { palette } from './palette'

const HIGHLIGHT = '#ffffff'

/** Gives every lit (non-glowing) material in the group a soft white glow, or removes it. */
function setHighlight(root: Object3D, on: boolean) {
  root.traverse((o) => {
    const mesh = o as Mesh
    if (!mesh.isMesh) return
    const m = mesh.material as MeshStandardMaterial
    if (!m.emissive) return
    if (on && m.emissiveIntensity === 0) {
      m.userData.highlighted = true
      m.emissive.set(HIGHLIGHT)
      m.emissiveIntensity = 0.22
    } else if (!on && m.userData.highlighted) {
      m.userData.highlighted = false
      m.emissive.set('#000000')
      m.emissiveIntensity = 0
    }
  })
}

interface Props {
  section: Section
  children: ReactNode
}

/** Wraps an object in the room: pointer cursor, glow and a label on hover, plus a floating marker. */
export function Hotspot({ section, children }: Props) {
  const group = useRef<Group>(null)
  const marker = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  useEffect(() => {
    if (group.current) setHighlight(group.current, hovered)
  }, [hovered])

  useFrame(({ clock }, delta) => {
    const m = marker.current
    if (!m) return
    m.position.y = section.anchor[1] + Math.sin(clock.elapsedTime * 2 + section.anchor[0]) * 0.06
    const target = hovered ? 1.4 : 1
    m.scale.setScalar(m.scale.x + (target - m.scale.x) * (1 - Math.exp(-10 * delta)))
  })

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      {children}
      <mesh ref={marker} position={section.anchor}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshBasicMaterial color={palette.accent} />
      </mesh>
      {hovered && (
        <Html position={section.anchor} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div className="label">{section.label}</div>
        </Html>
      )}
    </group>
  )
}
