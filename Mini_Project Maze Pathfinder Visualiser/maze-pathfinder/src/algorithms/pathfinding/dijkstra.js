import { getPassableNeighbors, reconstructPath } from '../../utils/mazeUtils';

/**
 * Dijkstra's Algorithm
 * Uniform-cost search. Guarantees shortest path in weighted graphs.
 * On unweighted mazes behaves like BFS but uses a priority queue.
 * Time: O((V+E) log V)  |  Space: O(V)
 */
export const dijkstra = (walls, startR, startC, endR, endC) => {
  const rows = walls.length, cols = walls[0].length;
  const visited  = Array.from({ length: rows }, () => Array(cols).fill(false));
  const dist     = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const cameFrom = Array.from({ length: rows }, () => Array(cols).fill(null));
  const frames = [];
  let nodesExplored = 0;

  dist[startR][startC] = 0;
  const pq = [{ r: startR, c: startC, d: 0 }];
  frames.push([{ row: startR, col: startC, isFrontier: true }]);

  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d);
    const { r, c, d } = pq.shift();

    if (visited[r][c]) continue;
    visited[r][c] = true;
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
        const nd = d + 1;
        if (nd < dist[nr][nc]) {
          dist[nr][nc]    = nd;
          cameFrom[nr][nc] = [r, c];
          pq.push({ r: nr, c: nc, d: nd });
          frames.push([{ row: nr, col: nc, isFrontier: true }]);
        }
      }
    }
  }

  return { frames, path: [], found: false, nodesExplored };
};