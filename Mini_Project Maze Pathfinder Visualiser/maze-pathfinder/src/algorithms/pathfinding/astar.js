import { getPassableNeighbors, reconstructPath, manhattan } from '../../utils/mazeUtils';

/**
 * A* Search
 * Uses Manhattan-distance heuristic to guide search toward the goal.
 * Optimal and complete. Generally the fastest for grid mazes.
 * Time: O(V log V)  |  Space: O(V)
 */
export const astar = (walls, startR, startC, endR, endC) => {
  const rows = walls.length, cols = walls[0].length;
  const closed   = Array.from({ length: rows }, () => Array(cols).fill(false));
  const cameFrom = Array.from({ length: rows }, () => Array(cols).fill(null));
  const gScore   = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const frames = [];
  let nodesExplored = 0;

  const h = (r, c) => manhattan(r, c, endR, endC);

  gScore[startR][startC] = 0;
  // Min-heap via sorted array (acceptable for visualisation sizes)
  const openSet = [{ r: startR, c: startC, f: h(startR, startC) }];
  frames.push([{ row: startR, col: startC, isFrontier: true }]);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const { r, c } = openSet.shift();

    if (closed[r][c]) continue;
    closed[r][c] = true;
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
      if (closed[nr][nc]) continue;
      const tentativeG = gScore[r][c] + 1;
      if (tentativeG < gScore[nr][nc]) {
        gScore[nr][nc] = tentativeG;
        cameFrom[nr][nc] = [r, c];
        const f = tentativeG + h(nr, nc);
        openSet.push({ r: nr, c: nc, f });
        frames.push([{ row: nr, col: nc, isFrontier: true }]);
      }
    }
  }

  return { frames, path: [], found: false, nodesExplored };
};