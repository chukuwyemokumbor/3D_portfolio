import { palette } from '../palette'
import { BOOKSHELF } from '../layout'

const WIDTH = 1.6
const HEIGHT = 2.0
const DEPTH = 0.4
const SHELVES = [0.05, 0.7, 1.35]

/** Deterministic book sizes so the shelf looks the same on every load. */
function booksFor(shelf: number) {
  const books: { w: number; h: number; color: string; lean: number }[] = []
  let x = 0
  for (let i = 0; x < WIDTH - 0.35; i++) {
    const seed = (shelf * 7 + i * 13) % 17
    const w = 0.07 + (seed % 4) * 0.02
    books.push({
      w,
      h: 0.38 + (seed % 5) * 0.04,
      color: palette.books[(shelf * 2 + i) % palette.books.length],
      lean: i === 5 ? 0.25 : 0,
    })
    x += w + 0.01
  }
  return books
}

/** Bookshelf against the left wall, turned to face into the room. */
export function Bookshelf() {
  return (
    <group position={[BOOKSHELF.x, 0, BOOKSHELF.z]} rotation-y={Math.PI / 2}>
      {/* Sides and back */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[(s * WIDTH) / 2, HEIGHT / 2, 0]} castShadow>
          <boxGeometry args={[0.05, HEIGHT, DEPTH]} />
          <meshStandardMaterial color={palette.shelf} />
        </mesh>
      ))}
      <mesh position={[0, HEIGHT / 2, -DEPTH / 2]} receiveShadow>
        <boxGeometry args={[WIDTH, HEIGHT, 0.03]} />
        <meshStandardMaterial color={palette.shelf} />
      </mesh>
      {/* Shelves with books */}
      {[...SHELVES, HEIGHT].map((y, shelf) => (
        <group key={y} position={[0, y, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[WIDTH, 0.04, DEPTH]} />
            <meshStandardMaterial color={palette.shelf} />
          </mesh>
          {shelf < SHELVES.length &&
            booksFor(shelf).reduce<{ x: number; nodes: React.ReactNode[] }>(
              (acc, b, i) => {
                const cx = -WIDTH / 2 + 0.08 + acc.x + b.w / 2
                acc.nodes.push(
                  <mesh key={i} position={[cx, 0.02 + b.h / 2, 0.02]} rotation-z={b.lean} castShadow>
                    <boxGeometry args={[b.w, b.h, DEPTH * 0.75]} />
                    <meshStandardMaterial color={b.color} />
                  </mesh>,
                )
                acc.x += b.w + 0.01
                return acc
              },
              { x: 0, nodes: [] },
            ).nodes}
        </group>
      ))}
    </group>
  )
}
