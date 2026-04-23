import { ROWS, COLS, DEFAULT_START, DEFAULT_END } from './constants';

/**
 * Create a single grid node with all default values.
 */
export const createNode = (row, col) => ({
  row,
  col,
  isWall:     false,
  isStart:    false,
  isEnd:      false,
  // Dijkstra / BFS
  distance:   Infinity,
  isVisited:  false,
  // A*
  g:          Infinity,
  f:          Infinity,
  h:          Infinity,
  // Path reconstruction
  previousNode: null,
});

/**
 * Build a fresh ROWS×COLS grid with start and end pre-placed.
 */
export const createGrid = (rows = ROWS, cols = COLS) => {
  const grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => createNode(r, c))
  );
  grid[DEFAULT_START.row][DEFAULT_START.col].isStart = true;
  grid[DEFAULT_END.row][DEFAULT_END.col].isEnd       = true;
  return grid;
};

/**
 * Deep-clone a grid, resetting all algorithm-specific fields so the original
 * grid's walls/start/end are preserved but the clone is clean for a new run.
 */
export const deepCloneGrid = (grid) =>
  grid.map(row =>
    row.map(n => ({
      ...n,
      distance:     Infinity,
      isVisited:    false,
      g:            Infinity,
      f:            Infinity,
      h:            Infinity,
      previousNode: null,
    }))
  );

/**
 * Return the 4 orthogonal (N/S/E/W) neighbors of a node within grid bounds.
 */
export const getNeighbors4 = (node, grid) => {
  const { row, col } = node;
  const maxR = grid.length - 1;
  const maxC = grid[0].length - 1;
  const neighbors = [];
  if (row > 0)    neighbors.push(grid[row - 1][col]);
  if (row < maxR) neighbors.push(grid[row + 1][col]);
  if (col > 0)    neighbors.push(grid[row][col - 1]);
  if (col < maxC) neighbors.push(grid[row][col + 1]);
  return neighbors;
};

/**
 * Walk the previousNode chain from endNode back to start, returning the
 * full path as an ordered array [start … end].
 */
export const reconstructPath = (endNode) => {
  const path = [];
  let cur = endNode;
  while (cur !== null) {
    path.unshift(cur);
    cur = cur.previousNode;
  }
  return path;
};
