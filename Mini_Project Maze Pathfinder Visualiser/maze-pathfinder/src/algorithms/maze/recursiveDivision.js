/**
 * Recursive Division
 * Starts open, adds walls recursively. Produces rooms and long straight passages.
 * Time: O(V)  |  Space: O(log V) stack
 */
export const recursiveDivision = (rows, cols) => {
  // Start with only border walls
  const walls = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      top:    r === 0,
      right:  c === cols - 1,
      bottom: r === rows - 1,
      left:   c === 0,
    }))
  );
  const frames = [];

  // Mark all cells as generated at start
  const initFrames = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      initFrames.push({ row: r, col: c, isGenerated: true });
  frames.push(initFrames);

  const addHWall = (r, cStart, cEnd, passage) => {
    const frame = [];
    for (let c = cStart; c <= cEnd; c++) {
      if (c !== passage) {
        walls[r][c].bottom       = true;
        walls[r + 1][c].top     = true;
        frame.push(
          { row: r,     col: c, wallsUpdate: { bottom: true }, isCurrentGen: true },
          { row: r + 1, col: c, wallsUpdate: { top:    true }, isCurrentGen: true },
        );
      }
    }
    if (frame.length) frames.push(frame);
    const clearFrame = [];
    for (let c = cStart; c <= cEnd; c++) {
      clearFrame.push({ row: r, col: c, isCurrentGen: false });
      clearFrame.push({ row: r + 1, col: c, isCurrentGen: false });
    }
    if (clearFrame.length) frames.push(clearFrame);
  };

  const addVWall = (c, rStart, rEnd, passage) => {
    const frame = [];
    for (let r = rStart; r <= rEnd; r++) {
      if (r !== passage) {
        walls[r][c].right        = true;
        walls[r][c + 1].left    = true;
        frame.push(
          { row: r, col: c,     wallsUpdate: { right: true }, isCurrentGen: true },
          { row: r, col: c + 1, wallsUpdate: { left:  true }, isCurrentGen: true },
        );
      }
    }
    if (frame.length) frames.push(frame);
    const clearFrame = [];
    for (let r = rStart; r <= rEnd; r++) {
      clearFrame.push({ row: r, col: c,     isCurrentGen: false });
      clearFrame.push({ row: r, col: c + 1, isCurrentGen: false });
    }
    if (clearFrame.length) frames.push(clearFrame);
  };

  const divide = (r1, c1, r2, c2) => {
    const h = r2 - r1;
    const w = c2 - c1;
    if (h < 1 || w < 1) return;

    const horizontal = w < h ? true : h < w ? false : Math.random() < 0.5;

    if (horizontal) {
      const wallRow  = r1 + Math.floor(Math.random() * h);
      const passage  = c1 + Math.floor(Math.random() * (w + 1));
      addHWall(wallRow, c1, c2, passage);
      divide(r1, c1, wallRow, c2);
      divide(wallRow + 1, c1, r2, c2);
    } else {
      const wallCol  = c1 + Math.floor(Math.random() * w);
      const passage  = r1 + Math.floor(Math.random() * (h + 1));
      addVWall(wallCol, r1, r2, passage);
      divide(r1, c1, r2, wallCol);
      divide(r1, wallCol + 1, r2, c2);
    }
  };

  divide(0, 0, rows - 1, cols - 1);
  return { frames, walls };
};