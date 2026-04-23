import { getPassableNeighbors, reconstructPath } from '../../utils/mazeUtils';

/**
 * Breadth-First Search
 * Explores level-by-level. Guarantees shortest path in unweighted graphs.
 * Time: O(V+E)  |  Space: O(V)
 */
export const bfs = (walls, startR, startC, endR, endC) => {
  const rows = walls.length, cols = walls[0].length;
  const visited  = Array.from({ length: rows }, () => Array(cols).fill(false));
  const cameFrom = Array.from({ length: rows }, () => Array(cols).fill(null));
  const frames = [];
  let nodesExplored = 0;

  const queue = [[startR, startC]];
  visited[startR][startC] = true;
  frames.push([{ row: startR, col: startC, isFrontier: true }]);

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    nodesExplored++;
    frames.push([{ row: r, col: c, isVisited: true, isFrontier: false }]);

    if (r === endR && c === endC) {
      const path = reconstructPath(cameFrom, rows, cols, endR, endC);
      for (const [pr, pc] of path) {
        frames.push([{ row: pr, col: pc, isPath: true, isVisited: true }]);
      }
      return { frames, path, found: true, nodesExplored };
    }

    for (const [nr, nc] of getPassableNeighbors(walls, r, c)) {
      if (!visited[nr][nc]) {
        visited[nr][nc] = true;
        cameFrom[nr][nc] = [r, c];
        queue.push([nr, nc]);
        frames.push([{ row: nr, col: nc, isFrontier: true }]);
      }
    }
  }

  return { frames, path: [], found: false, nodesExplored };
};