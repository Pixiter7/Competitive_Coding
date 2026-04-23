/**
 * Randomized Prim's Algorithm
 * Grows maze from a seed, creating many short branches.
 * Time: O(V log V)  |  Space: O(V)
 */
export const prims = (rows, cols) => {
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

  const addFrontier = (frontier, r, c) => {
    for (const { dir, dr, dc, opp } of DIRS) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        frontier.push({ fr: r, fc: c, nr, nc, dir, opp });
      }
    }
  };

  const sr = Math.floor(Math.random() * rows);
  const sc = Math.floor(Math.random() * cols);
  visited[sr][sc] = true;
  frames.push([{ row: sr, col: sc, isCurrentGen: true, isGenerated: true }]);

  const frontier = [];
  addFrontier(frontier, sr, sc);

  while (frontier.length > 0) {
    const idx = Math.floor(Math.random() * frontier.length);
    const { fr, fc, nr, nc, dir, opp } = frontier[idx];
    frontier.splice(idx, 1);

    if (visited[nr][nc]) continue;

    walls[fr][fc][dir] = false;
    walls[nr][nc][opp]  = false;
    visited[nr][nc] = true;

    frames.push([
      { row: fr, col: fc, isCurrentGen: true,  isGenerated: true, wallsUpdate: { [dir]: false } },
      { row: nr, col: nc, isCurrentGen: true,  isGenerated: true, wallsUpdate: { [opp]: false } },
    ]);
    frames.push([
      { row: fr, col: fc, isCurrentGen: false },
      { row: nr, col: nc, isCurrentGen: false },
    ]);

    addFrontier(frontier, nr, nc);
  }

  return { frames, walls };
};