/**
 * Randomized Kruskal's Algorithm
 * Shuffles all edges and uses Union-Find; creates mazes with many short branches.
 * Time: O(E α(V))  |  Space: O(V)
 */
export const kruskals = (rows, cols) => {
  const walls = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ top: true, right: true, bottom: true, left: true }))
  );
  const frames = [];

  // Union-Find
  const id = (r, c) => r * cols + c;
  const parent = Array.from({ length: rows * cols }, (_, i) => i);
  const rank   = Array(rows * cols).fill(0);

  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  const union = (x, y) => {
    const px = find(x), py = find(y);
    if (px === py) return false;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
  };

  // Build edge list
  const edges = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r + 1 < rows) edges.push({ r1: r, c1: c, r2: r + 1, c2: c, dir: 'bottom', opp: 'top' });
      if (c + 1 < cols) edges.push({ r1: r, c1: c, r2: r,     c2: c + 1, dir: 'right',  opp: 'left' });
    }
  }

  // Fisher-Yates shuffle
  for (let i = edges.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [edges[i], edges[j]] = [edges[j], edges[i]];
  }

  for (const { r1, c1, r2, c2, dir, opp } of edges) {
    if (union(id(r1, c1), id(r2, c2))) {
      walls[r1][c1][dir] = false;
      walls[r2][c2][opp] = false;
      frames.push([
        { row: r1, col: c1, isCurrentGen: true,  isGenerated: true, wallsUpdate: { [dir]: false } },
        { row: r2, col: c2, isCurrentGen: true,  isGenerated: true, wallsUpdate: { [opp]: false } },
      ]);
      frames.push([
        { row: r1, col: c1, isCurrentGen: false },
        { row: r2, col: c2, isCurrentGen: false },
      ]);
    }
  }

  return { frames, walls };
};