import { useMazeVisualizer } from './hooks/useMazeVisualizer';
import MazeGrid  from './components/MazeGrid/MazeGrid';
import Controls  from './components/Controls/Controls';
import Legend    from './components/Legend/Legend';

const App = () => {
  const viz = useMazeVisualizer();

  return (
    <div className="app">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-title-group">
            <div className="logo-mark">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="1" y="1" width="30" height="30" rx="4" stroke="#8be9fd" strokeWidth="1.5" />
                <path d="M8 8h4v4H8zM16 8h8v4h-4v4h-4zM8 14v4h8v-4M20 14h4v4h-4zM8 20h4v8h4v-8h8" stroke="#50fa7b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div>
              <h1 className="app-title">Maze Pathfinder</h1>
              <p className="app-subtitle">Design &amp; Analysis of Algorithms — Visualization</p>
            </div>
          </div>
          <div className="header-tags">
            <span className="tag">DAA Project</span>
            <span className="tag tag-accent">Backtracking</span>
            <span className="tag">Graph Search</span>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="app-main">
        <MazeGrid grid={viz.displayGrid} />
        <Controls
          rows={viz.rows} cols={viz.cols}
          mazeAlgo={viz.mazeAlgo} pathAlgo={viz.pathAlgo}
          speed={viz.speed} status={viz.status} stats={viz.stats}
          setMazeAlgo={viz.setMazeAlgo} setPathAlgo={viz.setPathAlgo}
          setSpeed={viz.setSpeed}
          generateMaze={viz.generateMaze} solveMaze={viz.solveMaze}
          clearPath={viz.clearPath} reset={viz.reset}
          pause={viz.pause} resume={viz.resume}
          handleGridSizeChange={viz.handleGridSizeChange}
          canGenerate={viz.canGenerate} canSolve={viz.canSolve}
          canPause={viz.canPause} canResume={viz.canResume}
          canClear={viz.canClear}
        />
      </main>

      {/* ── Legend ─────────────────────────────────────────────────────────── */}
      <footer className="app-footer">
        <Legend />
        <p className="credits">
          Built with React + Vite &nbsp;·&nbsp; Canvas Rendering &nbsp;·&nbsp;
          Maze: RB / Prim's / Kruskal's / Recursive Division &nbsp;·&nbsp;
          Path: DFS / BFS / A* / Dijkstra's
        </p>
      </footer>
    </div>
  );
};

export default App;