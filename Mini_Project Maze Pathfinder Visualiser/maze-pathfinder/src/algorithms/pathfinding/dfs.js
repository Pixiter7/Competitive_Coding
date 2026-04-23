import { getPassableNeighbors, reconstructPath } from '../../utils/mazeUtils';

/**
 * Depth-First Search (with backtracking)
 * Explores as deep as possible before backtracking.
 * Does NOT guarantee shortest path.
 * Time: O(V+E)  |  Space: O(V)
 */
export const dfs = (walls, startR, startC, endR, endC) => {
  const rows = walls.length, cols = walls[0].length;
  const visited  = Array.from({ length: rows }, () => Array(cols).fill(false));
  const cameFrom = Array.from({ length: rows }, () => Array(cols).fill(null));
  const frames = [];
  let nodesExplored = 0;

  const stack = [[startR, startC]];
  visited[startR][startC] = true;

  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];
    nodesExplored++;
    frames.push([{ row: r, col: c, isVisited: true, isFrontier: true }]);

    if (r === endR && c === endC) {
      const path = reconstructPath(cameFrom, rows, cols, endR, endC);
      for (const [pr, pc] of path) {
        frames.push([{ row: pr, col: pc, isPath: true, isFrontier: false, isVisited: true }]);
      }
      return { frames, path, found: true, nodesExplored };
    }

    const unvisited = getPassableNeighbors(walls, r, c)
      .filter(([nr, nc]) => !visited[nr][nc]);

    if (unvisited.length > 0) {
      const [nr, nc] = unvisited[0];
      visited[nr][nc] = true;
      cameFrom[nr][nc] = [r, c];
      stack.push([nr, nc]);
      frames.push([{ row: r, col: c, isFrontier: false }]);
    } else {
      stack.pop();
      frames.push([{ row: r, col: c, isFrontier: false }]);
    }
  }

  return { frames, path: [], found: false, nodesExplored };
};