/** Shared positions and sizes so props line up with each other. */
export const DESK = { x: 0.6, z: -3.35, height: 0.78, width: 2.6, depth: 1.05 }

const deskTop = DESK.height + 0.035

export const MONITOR = { x: DESK.x + 0.15, y: deskTop, z: DESK.z - 0.15 }
export const LAMP = { x: DESK.x - 1.0, y: deskTop, z: DESK.z - 0.2 }
export const MUG = { x: DESK.x + 0.95, y: deskTop, z: DESK.z + 0.2 }
export const BOOKSHELF = { x: -3.72, z: -1.6 }
export const PLANT = { x: -3.35, z: -3.35 }
export const POSTER = { x: -1.9, y: 2.35, z: -3.98 }
export const SIDE_TABLE = { x: 3.0, z: -3.4 }
