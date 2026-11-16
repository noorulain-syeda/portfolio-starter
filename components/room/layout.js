// Where everything in Yara's room is, in metres. Shared by the 3D room and the
// floor-plan map, so the two can never disagree. x runs left to right as you face
// the desk, z runs from the desk wall (-1.5) back to the door wall (2.5).
export const ROOM = { x0: -2.2, x1: 2.2, z0: -1.5, z1: 2.5, h: 2.7, deskZ: -1.05 };

// The dot for each spot: [x, y, z].
export const ANCHORS = {
  monitor: [0, 1.25, -0.9],
  certificates: [1.42, 2.21, -1.46],
  degrees: [1.05, 1.62, -1.46],
  awards: [2.02, 1.98, -0.35],
  medals: [1.93, 0.55, 0.3],
  cameras: [2.02, 1.12, -0.8],
  patents: [2.08, 1.18, 0.0],
  chess: [1.48, 0.8, -1.08],
  calligraphy: [-2.15, 1.86, 1.2],
  books: [0.64, 0.9, -0.88],
  plant: [-1.42, 1.32, -1.28],
  drive: [-0.42, 0.88, -0.96],
  contact: [-0.6, 0.84, -0.78],
  diary: [0.36, 0.86, -0.8],
  board: [-0.95, 1.83, 2.45],
  lamp: [0.47, 1.2, -1.27],
  records: [-0.58, 0.93, -1.24],
};

// Where you stand to look at each spot, and what you look at: { pos, target }.
export const VIEWS = {
  monitor: { pos: [0, 1.12, -0.32], target: [0, 1.01, -0.92] },
  certificates: { pos: [0, 1.82, -0.2], target: [0, 2.2, -1.5] },
  degrees: { pos: [0, 1.58, -0.55], target: [0, 1.62, -1.5] },
  awards: { pos: [0.62, 1.55, -0.36], target: [2.07, 1.55, -0.36] },
  medals: { pos: [1.2, 1.05, 0.34], target: [1.93, 0.72, 0.3] },
  cameras: { pos: [1.25, 1.25, -0.72], target: [2.07, 1.0, -0.8] },
  patents: { pos: [1.32, 1.25, 0.1], target: [2.07, 1.05, 0.06] },
  chess: { pos: [1.2, 1.25, -0.5], target: [1.48, 0.64, -1.08] },
  calligraphy: { pos: [-0.72, 1.5, 1.2], target: [-2.2, 1.5, 1.2] },
  books: { pos: [0.45, 1.2, -0.38], target: [0.64, 0.8, -0.88] },
  plant: { pos: [-1.05, 1.45, -0.45], target: [-1.42, 0.98, -1.28] },
  drive: { pos: [-0.32, 1.2, -0.4], target: [-0.45, 0.78, -0.98] },
  contact: { pos: [-0.5, 1.15, -0.28], target: [-0.6, 0.76, -0.78] },
  diary: { pos: [0.3, 1.18, -0.34], target: [0.37, 0.77, -0.83] },
  board: { pos: [-0.95, 1.5, 1.35], target: [-0.95, 1.45, 2.5] },
  records: { pos: [-0.36, 1.22, -0.58], target: [-0.58, 0.8, -1.24] },
};

// Outlines for the floor-plan map: [x, z, width, depth] rectangles and wall segments.
export const PLAN = {
  rug: [-1.15, -1.25, 2.3, 1.6],
  desk: [-0.8, -1.41, 1.6, 0.72],
  chair: [0.88, -0.08, 0.24],
  table: [1.2, -1.36, 0.56, 0.56],
  shelves: [2.07, -1.25, 0.13, 1.8],
  records: [-1.85, -1.41, 0.86, 0.42],
  walls: {
    certificates: [[-1.43, -1.5], [1.43, -1.5]],
    window: [[-2.2, -0.9], [-2.2, 0.3]],
    calligraphy: [[-2.2, 0.64], [-2.2, 1.06], [-2.2, 1.34], [-2.2, 1.76]],
    board: [[-1.4, 2.5], [-0.5, 2.5]],
    garden: [[2.2, 1.16], [2.2, 1.94]],
  },
  door: [0.84, 2.5, 0.92],
};
