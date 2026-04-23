import { shuffle } from '../../utils/mazeUtils';

/**
 * Recursive Backtracking (Iterative DFS)
 * Produces long, winding corridors. Perfect maze guaranteed.
 * Time: O(V)  |  Space: O(V)
 */
export const recursiveBacktracking = (rows, cols) => {
  const walls = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ top: true, right: true, bottom: true, left: true }))
  );
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const frames = [];

  const DIRS = [
    { dir: 'top',    dr: -1, dc:  0, opp: 'bottom' },
    { dir: 'right',  dr:  0, dc:  1, opp: 'left'   },
    { dir: 'bottom', dr:  1, dc:  0, opp: 'top'    },
    { dir: 'left',   dr:  0, dc: -1, opp: 'right'  },
  ];

  const sr = Math.floor(Math.random() * rows);
  const sc = Math.floor(Math.random() * cols);
  visited[sr][sc] = true;
  const stack = [{ r: sr, c: sc }];
  frames.push([{ row: sr, col: sc, isCurrentGen: true, isGenerated: true }]);

  while (stack.length > 0) {
    const { r, c } = stack[stack.length - 1];
    const unvisited = shuffle(DIRS)
      .map(({ dir, dr, dc, opp }) => ({ dir, opp, nr: r + dr, nc: c + dc }))
      .filter(({ nr, nc }) => nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]);

    if (unvisited.length > 0) {
      const { dir, opp, nr, nc } = unvisited[0];
      walls[r][c][dir] = false;
      walls[nr][nc][opp] = false;
      visited[nr][nc] = true;
      stack.push({ r: nr, c: nc });
      frames.push([
        { row: r,  col: c,  isCurrentGen: false, isGenerated: true, wallsUpdate: { [dir]: false } },
        { row: nr, col: nc, isCurrentGen: true,  isGenerated: true, wallsUpdate: { [opp]: false } },
      ]);
    } else {
      stack.pop();
      frames.push([{ row: r, col: c, isCurrentGen: false }]);
      if (stack.length > 0) {
        const { r: pr, c: pc } = stack[stack.length - 1];
        frames.push([{ row: pr, col: pc, isCurrentGen: true }]);
      }
    }
  }
  return { frames, walls };
};