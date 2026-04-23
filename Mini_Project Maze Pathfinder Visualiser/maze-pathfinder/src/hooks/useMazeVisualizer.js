import { useState, useRef, useCallback, useEffect } from 'react';
import { createGrid, cloneGrid, applyFrame, extractWalls, speedToDelay } from '../utils/mazeUtils';
import { recursiveBacktracking, prims, kruskals, recursiveDivision } from '../algorithms/maze';
import { dfs, bfs, astar, dijkstra } from '../algorithms/pathfinding';

const MAZE_FNS    = { recursiveBacktracking, prims, kruskals, recursiveDivision };
const PATH_FNS    = { dfs, bfs, astar, dijkstra };

const DEFAULT_ROWS = 21;
const DEFAULT_COLS = 21;

export const useMazeVisualizer = () => {
  // ── Config state ────────────────────────────────────────────────────────────
  const [rows,      setRows]      = useState(DEFAULT_ROWS);
  const [cols,      setCols]      = useState(DEFAULT_COLS);
  const [mazeAlgo,  setMazeAlgo]  = useState('recursiveBacktracking');
  const [pathAlgo,  setPathAlgo]  = useState('astar');
  const [speed,     setSpeed]     = useState(50);

  // ── Visualisation state ─────────────────────────────────────────────────────
  const [displayGrid, setDisplayGrid] = useState(() => createGrid(DEFAULT_ROWS, DEFAULT_COLS));
  const [status,      setStatus]      = useState('idle');
  // idle | generating | generated | solving | solved | noPath | paused

  const [stats, setStats] = useState({
    nodesExplored: 0,
    pathLength:    0,
    genTimeMs:     0,
    solveTimeMs:   0,
  });

  // ── Refs (survive re-renders without causing them) ──────────────────────────
  const timeoutRef    = useRef(null);
  const framesRef     = useRef([]);
  const frameIdxRef   = useRef(0);
  const statusRef     = useRef('idle');
  const speedRef      = useRef(50);
  const isPausedRef   = useRef(false);
  const wallsRef      = useRef(null);   // finalized walls after generation
  const onDoneRef     = useRef(null);
  const gridRef       = useRef(createGrid(DEFAULT_ROWS, DEFAULT_COLS)); // mutable grid for fast updates

  // keep refs in sync
  useEffect(() => { speedRef.current  = speed; }, [speed]);

  // ── Internal helpers ────────────────────────────────────────────────────────
  const stopAnimation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleStep = useCallback(() => {
    const delay = speedToDelay(speedRef.current);
    timeoutRef.current = setTimeout(executeStep, delay);
  }, []); // eslint-disable-line

  const executeStep = useCallback(() => {
    if (isPausedRef.current) return;

    const frames = framesRef.current;
    const idx    = frameIdxRef.current;

    if (idx >= frames.length) {
      onDoneRef.current?.();
      return;
    }

    const frame = frames[idx];
    frameIdxRef.current = idx + 1;

    // Mutate gridRef, then push a shallow clone to React state
    applyFrame(gridRef.current, frame);
    // Trigger re-render with a new array reference (row refs stay stable for perf)
    setDisplayGrid(gridRef.current.map(row => [...row]));

    scheduleStep();
  }, [scheduleStep]);

  const startAnimation = useCallback((frames, type, onDone) => {
    stopAnimation();
    framesRef.current   = frames;
    frameIdxRef.current = 0;
    onDoneRef.current   = onDone;
    isPausedRef.current = false;
    statusRef.current   = type;
    setStatus(type);
    scheduleStep();
  }, [stopAnimation, scheduleStep]);

  // ── Reset grid helper ───────────────────────────────────────────────────────
  const buildFreshGrid = useCallback((r, c) => {
    const g = createGrid(r, c);
    gridRef.current = g.map(row => row.map(cell => ({ ...cell, walls: { ...cell.walls } })));
    return g;
  }, []);

  // Reset only path-display state (keep maze structure + walls)
  const resetPathState = useCallback(() => {
    for (let r = 0; r < gridRef.current.length; r++) {
      for (let c = 0; c < gridRef.current[0].length; c++) {
        const cell = gridRef.current[r][c];
        cell.isVisited    = false;
        cell.isPath       = false;
        cell.isFrontier   = false;
        cell.isCurrentGen = false;
      }
    }
    setDisplayGrid(gridRef.current.map(row => [...row]));
  }, []);

  // ── Public API ──────────────────────────────────────────────────────────────

  const generateMaze = useCallback(() => {
    stopAnimation();
    setStatus('idle');
    setStats({ nodesExplored: 0, pathLength: 0, genTimeMs: 0, solveTimeMs: 0 });

    const freshGrid = buildFreshGrid(rows, cols);
    setDisplayGrid(freshGrid.map(row => [...row]));

    const t0 = performance.now();
    const mazeAlgoFn = MAZE_FNS[mazeAlgo];
    const { frames, walls } = mazeAlgoFn(rows, cols);
    const genTimeMs = +(performance.now() - t0).toFixed(1);

    // Store computed walls for pathfinding
    wallsRef.current = walls;
    setStats(s => ({ ...s, genTimeMs }));

    startAnimation(frames, 'generating', () => {
      // Apply final walls to gridRef to ensure full sync
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          gridRef.current[r][c].walls       = { ...walls[r][c] };
          gridRef.current[r][c].isCurrentGen = false;
          gridRef.current[r][c].isGenerated  = true;
        }
      }
      setDisplayGrid(gridRef.current.map(row => [...row]));
      setStatus('generated');
      statusRef.current = 'generated';
    });
  }, [rows, cols, mazeAlgo, stopAnimation, buildFreshGrid, startAnimation]);

  const solveMaze = useCallback(() => {
    if (!wallsRef.current) return;
    stopAnimation();
    resetPathState();

    const walls    = wallsRef.current;
    const endR     = rows - 1, endC = cols - 1;
    const pathFn   = PATH_FNS[pathAlgo];

    const t0 = performance.now();
    const { frames, path, found, nodesExplored } = pathFn(walls, 0, 0, endR, endC);
    const solveTimeMs = +(performance.now() - t0).toFixed(1);

    setStats(s => ({
      ...s,
      nodesExplored,
      pathLength:  found ? path.length : 0,
      solveTimeMs,
    }));

    startAnimation(frames, 'solving', () => {
      setStatus(found ? 'solved' : 'noPath');
      statusRef.current = found ? 'solved' : 'noPath';
    });
  }, [rows, cols, pathAlgo, stopAnimation, resetPathState, startAnimation]);

  const clearPath = useCallback(() => {
    if (statusRef.current === 'generating') return;
    stopAnimation();
    resetPathState();
    setStatus(wallsRef.current ? 'generated' : 'idle');
    statusRef.current = wallsRef.current ? 'generated' : 'idle';
    setStats(s => ({ ...s, nodesExplored: 0, pathLength: 0, solveTimeMs: 0 }));
  }, [stopAnimation, resetPathState]);

  const reset = useCallback(() => {
    stopAnimation();
    wallsRef.current = null;
    const freshGrid = buildFreshGrid(rows, cols);
    setDisplayGrid(freshGrid.map(row => [...row]));
    setStatus('idle');
    statusRef.current = 'idle';
    setStats({ nodesExplored: 0, pathLength: 0, genTimeMs: 0, solveTimeMs: 0 });
  }, [rows, cols, stopAnimation, buildFreshGrid]);

  const pause = useCallback(() => {
    if (!['generating', 'solving'].includes(statusRef.current)) return;
    isPausedRef.current = true;
    stopAnimation();
    setStatus('paused');
    statusRef.current = 'paused';
  }, [stopAnimation]);

  const resume = useCallback(() => {
    if (statusRef.current !== 'paused') return;
    isPausedRef.current = false;
    const prevType = framesRef.current.length > 0 ? 'resuming' : 'idle';
    setStatus(prevType);
    statusRef.current = prevType;
    scheduleStep();
  }, [scheduleStep]);

  const handleGridSizeChange = useCallback((newRows, newCols) => {
    stopAnimation();
    setRows(newRows);
    setCols(newCols);
    wallsRef.current = null;
    const freshGrid = buildFreshGrid(newRows, newCols);
    setDisplayGrid(freshGrid.map(row => [...row]));
    setStatus('idle');
    statusRef.current = 'idle';
    setStats({ nodesExplored: 0, pathLength: 0, genTimeMs: 0, solveTimeMs: 0 });
  }, [stopAnimation, buildFreshGrid]);

  const canGenerate = !['generating', 'solving'].includes(status);
  const canSolve    = status === 'generated' || status === 'solved' || status === 'noPath';
  const canPause    = ['generating', 'solving', 'resuming'].includes(status);
  const canResume   = status === 'paused';
  const canClear    = ['generated', 'solved', 'noPath'].includes(status);

  return {
    // state
    rows, cols, mazeAlgo, pathAlgo, speed, displayGrid, status, stats,
    // setters
    setMazeAlgo, setPathAlgo, setSpeed,
    // actions
    generateMaze, solveMaze, clearPath, reset, pause, resume,
    handleGridSizeChange,
    // derived
    canGenerate, canSolve, canPause, canResume, canClear,
  };
};