import { MAZE_ALGORITHMS } from '../../algorithms/maze';
import { PATH_ALGORITHMS } from '../../algorithms/pathfinding';
import './Controls.css';

const SIZE_PRESETS = [
  { label: 'Tiny',   rows: 11, cols: 11 },
  { label: 'Small',  rows: 15, cols: 15 },
  { label: 'Medium', rows: 21, cols: 21 },
  { label: 'Large',  rows: 31, cols: 31 },
  { label: 'Huge',   rows: 41, cols: 41 },
];

const StatusBadge = ({ status }) => {
  const map = {
    idle:       { label: 'Ready',      cls: 'idle'      },
    generating: { label: 'Generating…', cls: 'active'    },
    generated:  { label: 'Maze Ready', cls: 'ready'     },
    solving:    { label: 'Solving…',   cls: 'active'    },
    solved:     { label: 'Path Found', cls: 'success'   },
    noPath:     { label: 'No Path!',   cls: 'error'     },
    paused:     { label: 'Paused',     cls: 'paused'    },
    resuming:   { label: 'Resuming…',  cls: 'active'    },
  };
  const { label, cls } = map[status] || map.idle;
  return <span className={`status-badge status-${cls}`}>{label}</span>;
};

const Controls = ({
  rows, cols, mazeAlgo, pathAlgo, speed, status, stats,
  setMazeAlgo, setPathAlgo, setSpeed,
  generateMaze, solveMaze, clearPath, reset, pause, resume,
  handleGridSizeChange,
  canGenerate, canSolve, canPause, canResume, canClear,
}) => {
  const mazeInfo = MAZE_ALGORITHMS[mazeAlgo];
  const pathInfo = PATH_ALGORITHMS[pathAlgo];

  return (
    <div className="controls-panel">
      {/* Header */}
      <div className="controls-header">
        <h2 className="controls-title">Controls</h2>
        <StatusBadge status={status} />
      </div>

      {/* ── Grid Size ── */}
      <section className="ctrl-section">
        <label className="ctrl-label">Grid Size <span className="dim">{rows} × {cols}</span></label>
        <div className="size-presets">
          {SIZE_PRESETS.map(p => (
            <button
              key={p.label}
              className={`preset-btn ${rows === p.rows && cols === p.cols ? 'active' : ''}`}
              onClick={() => handleGridSizeChange(p.rows, p.cols)}
              disabled={!canGenerate}
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Maze Algorithm ── */}
      <section className="ctrl-section">
        <label className="ctrl-label">Maze Algorithm</label>
        <select
          className="ctrl-select"
          value={mazeAlgo}
          onChange={e => setMazeAlgo(e.target.value)}
          disabled={!canGenerate}
        >
          {Object.entries(MAZE_ALGORITHMS).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <div className="algo-info">
          <span className="algo-badge maze-badge">{mazeInfo.badge}</span>
          <p className="algo-desc">{mazeInfo.desc}</p>
          <code className="algo-complexity">{mazeInfo.complexity}</code>
        </div>
      </section>

      {/* ── Pathfinding Algorithm ── */}
      <section className="ctrl-section">
        <label className="ctrl-label">Pathfinding Algorithm</label>
        <select
          className="ctrl-select"
          value={pathAlgo}
          onChange={e => setPathAlgo(e.target.value)}
          disabled={status === 'solving'}
        >
          {Object.entries(PATH_ALGORITHMS).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <div className="algo-info">
          <span className="algo-badge path-badge">{pathInfo.badge}</span>
          <p className="algo-desc">{pathInfo.desc}</p>
          <code className="algo-complexity">{pathInfo.complexity}</code>
          {pathInfo.guaranteesShortestPath && (
            <span className="optimal-tag">✓ Optimal path</span>
          )}
        </div>
      </section>

      {/* ── Speed ── */}
      <section className="ctrl-section">
        <label className="ctrl-label">
          Animation Speed
          <span className="dim">
            {speed < 20 ? 'Slow' : speed < 60 ? 'Medium' : speed < 85 ? 'Fast' : 'Blazing'}
          </span>
        </label>
        <div className="speed-row">
          <span className="speed-label">🐢</span>
          <input
            type="range" min="1" max="100" value={speed}
            className="ctrl-range"
            onChange={e => setSpeed(Number(e.target.value))}
          />
          <span className="speed-label">⚡</span>
        </div>
      </section>

      {/* ── Action Buttons ── */}
      <section className="ctrl-section btn-section">
        <button
          className="ctrl-btn btn-generate"
          onClick={generateMaze}
          disabled={!canGenerate}
        >
          <span className="btn-icon">⬛</span> Generate Maze
        </button>

        <button
          className="ctrl-btn btn-solve"
          onClick={solveMaze}
          disabled={!canSolve}
        >
          <span className="btn-icon">🔍</span> Find Path
        </button>

        <div className="btn-row">
          <button
            className="ctrl-btn btn-clear"
            onClick={clearPath}
            disabled={!canClear}
          >
            Clear Path
          </button>
          <button
            className="ctrl-btn btn-reset"
            onClick={reset}
            disabled={['generating', 'solving'].includes(status)}
          >
            Reset All
          </button>
        </div>

        {(canPause || canResume) && (
          <button
            className={`ctrl-btn ${canPause ? 'btn-pause' : 'btn-resume'}`}
            onClick={canPause ? pause : resume}
          >
            {canPause ? '⏸ Pause' : '▶ Resume'}
          </button>
        )}
      </section>

      {/* ── Stats ── */}
      <section className="ctrl-section stats-section">
        <label className="ctrl-label">Statistics</label>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value cyan">{stats.genTimeMs > 0 ? `${stats.genTimeMs}ms` : '—'}</span>
            <span className="stat-name">Gen Time</span>
          </div>
          <div className="stat-item">
            <span className="stat-value purple">{stats.nodesExplored || '—'}</span>
            <span className="stat-name">Nodes Explored</span>
          </div>
          <div className="stat-item">
            <span className="stat-value green">{stats.pathLength || '—'}</span>
            <span className="stat-name">Path Length</span>
          </div>
          <div className="stat-item">
            <span className="stat-value pink">{stats.solveTimeMs > 0 ? `${stats.solveTimeMs}ms` : '—'}</span>
            <span className="stat-name">Solve Time</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Controls;