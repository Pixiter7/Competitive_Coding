import { useRef, useEffect, useCallback } from 'react';
import './MazeGrid.css';

// Canvas colour tokens
const C = {
  bg:        '#080810',
  wall:      '#6272a4',
  passage:   '#10101e',
  generated: '#1a1f3c',
  current:   '#f1fa8c',
  visited:   '#3d1f6b',
  frontier:  '#ff5555',
  path:      '#50fa7b',
  start:     '#8be9fd',
  end:       '#ff79c6',
};

const drawMaze = (ctx, grid, cs) => {
  if (!grid || !grid.length) return;
  const rows = grid.length;
  const cols = grid[0].length;

  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, cols * cs, rows * cs);

  const ww = Math.max(1, Math.round(cs * 0.08)); // wall width

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];
      const x = c * cs, y = r * cs;

      // ── Cell fill ──
      let fill = C.passage;
      if      (cell.isPath)       fill = C.path;
      else if (cell.isFrontier)   fill = C.frontier;
      else if (cell.isVisited)    fill = C.visited;
      else if (cell.isCurrentGen) fill = C.current;
      else if (cell.isGenerated)  fill = C.generated;

      if (cell.isStart) fill = C.start;
      if (cell.isEnd)   fill = C.end;

      ctx.fillStyle = fill;
      ctx.fillRect(x, y, cs, cs);

      // ── Glow for special cells ──
      if (cell.isPath || cell.isStart || cell.isEnd || cell.isCurrentGen) {
        ctx.save();
        ctx.shadowBlur  = cs * 0.9;
        ctx.shadowColor = fill;
        ctx.fillStyle   = fill;
        ctx.globalAlpha = 0.35;
        ctx.fillRect(x, y, cs, cs);
        ctx.restore();
      }
    }
  }

  // ── Walls (second pass, on top) ──
  ctx.strokeStyle = C.wall;
  ctx.lineWidth   = ww;
  ctx.lineCap     = 'square';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const { walls } = grid[r][c];
      const x = c * cs, y = r * cs;
      ctx.beginPath();
      if (walls.top)    { ctx.moveTo(x,      y);      ctx.lineTo(x + cs, y);      }
      if (walls.right)  { ctx.moveTo(x + cs, y);      ctx.lineTo(x + cs, y + cs); }
      if (walls.bottom) { ctx.moveTo(x,      y + cs); ctx.lineTo(x + cs, y + cs); }
      if (walls.left)   { ctx.moveTo(x,      y);      ctx.lineTo(x,      y + cs); }
      ctx.stroke();
    }
  }

  // ── Labels for Start / End ──
  if (cs >= 11) {
    const fontSize = Math.max(8, Math.floor(cs * 0.45));
    ctx.font         = `700 ${fontSize}px 'Space Mono', monospace`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = grid[r][c];
        if (cell.isStart || cell.isEnd) {
          ctx.fillStyle = '#080810';
          ctx.fillText(
            cell.isStart ? 'S' : 'E',
            c * cs + cs / 2,
            r * cs + cs / 2,
          );
        }
      }
    }
  }
};

const MazeGrid = ({ grid }) => {
  const canvasRef = useRef(null);

  const computeCellSize = useCallback((rows, cols) => {
    const maxPx = Math.min(window.innerWidth * 0.6, 580);
    return Math.max(8, Math.floor(maxPx / Math.max(rows, cols)));
  }, []);

  useEffect(() => {
    if (!grid || !grid.length) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rows = grid.length;
    const cols = grid[0].length;
    const cs   = computeCellSize(rows, cols);

    canvas.width  = cols * cs;
    canvas.height = rows * cs;

    const ctx = canvas.getContext('2d');
    drawMaze(ctx, grid, cs);
  }, [grid, computeCellSize]);

  return (
    <div className="maze-wrapper">
      <canvas ref={canvasRef} className="maze-canvas" />
    </div>
  );
};

export default MazeGrid;