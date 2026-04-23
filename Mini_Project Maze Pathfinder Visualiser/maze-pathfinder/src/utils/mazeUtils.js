// ─── Core Grid Factory ────────────────────────────────────────────────────────

/**
 * Create a fresh grid. allWalls=true → every internal wall up (for carving algos).
 * allWalls=false → only border walls (for recursive division).
 */
export const createGrid = (rows, cols, allWalls = true) =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      walls: {
        top:    allWalls ? true : r === 0,
        right:  allWalls ? true : c === cols - 1,
        bottom: allWalls ? true : r === rows - 1,
        left:   allWalls ? true : c === 0,
      },
      isStart:      r === 0       && c === 0,
      isEnd:        r === rows - 1 && c === cols - 1,
      isVisited:    false,
      isPath:       false,
      isFrontier:   false,
      isCurrentGen: false,
      isGenerated:  false,
    }))
  );

/** Deep-clone a grid (walls object included). */
export const cloneGrid = (grid) =>
  grid.map(row =>
    row.map(cell => ({ ...cell, walls: { ...cell.walls } }))
  );

/** Apply an array of cell-update objects to a grid (mutates in-place). */
export const applyFrame = (grid, frame) => {
  for (const { row, col, wallsUpdate, ...props } of frame) {
    if (wallsUpdate) Object.assign(grid[row][col].walls, wallsUpdate);
    Object.assign(grid[row][col], props);
  }
};

// ─── Neighbour Helpers ────────────────────────────────────────────────────────

const DIRS = [
  { dir: 'top',    dr: -1, dc:  0, opp: 'bottom' },
  { dir: 'right',  dr:  0, dc:  1, opp: 'left'   },
  { dir: 'bottom', dr:  1, dc:  0, opp: 'top'    },
  { dir: 'left',   dr:  0, dc: -1, opp: 'right'  },
];
export { DIRS };

/** All 4 directional neighbours, regardless of walls. */
export const getNeighbors = (rows, cols, r, c) =>
  DIRS
    .map(({ dir, dr, dc, opp }) => ({
      dir, opp, r: r + dr, c: c + dc,
    }))
    .filter(({ r: nr, c: nc }) =>
      nr >= 0 && nr < rows && nc >= 0 && nc < cols
    );

/** Neighbours reachable through open walls. */
export const getPassableNeighbors = (walls, r, c) => {
  const rows = walls.length, cols = walls[0].length;
  const result = [];
  if (!walls[r][c].top    && r > 0)        result.push([r - 1, c]);
  if (!walls[r][c].right  && c < cols - 1) result.push([r, c + 1]);
  if (!walls[r][c].bottom && r < rows - 1) result.push([r + 1, c]);
  if (!walls[r][c].left   && c > 0)        result.push([r, c - 1]);
  return result;
};

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Fisher-Yates shuffle. */
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Convert speed (1-100) to animation delay ms. Exponential feel. */
export const speedToDelay = (speed) =>
  Math.max(1, Math.round(600 * Math.pow(0.955, speed - 1)));

/** Extract walls grid from full display grid (for pathfinding input). */
export const extractWalls = (grid) =>
  grid.map(row => row.map(({ walls }) => ({ ...walls })));

/** Reconstruct path array from cameFrom table. */
export const reconstructPath = (cameFrom, rows, cols, endR, endC) => {
  const path = [];
  let cur = [endR, endC];
  while (cur) {
    path.unshift(cur);
    const [r, c] = cur;
    cur = cameFrom[r][c];
  }
  return path;
};

/** Manhattan heuristic for A*. */
export const manhattan = (r1, c1, r2, c2) =>
  Math.abs(r1 - r2) + Math.abs(c1 - c2);
