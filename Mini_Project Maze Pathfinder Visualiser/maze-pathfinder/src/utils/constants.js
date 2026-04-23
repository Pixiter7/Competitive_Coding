export const ROWS = 21;   // must be odd for maze generation
export const COLS = 45;   // must be odd for maze generation

export const DEFAULT_START = { row: 1, col: 1 };
export const DEFAULT_END   = { row: ROWS - 2, col: COLS - 2 };

export const SPEED_OPTIONS = [
  { label: '🐢 Turtle',   value: 120 },
  { label: '🚶 Slow',     value: 50  },
  { label: '🏃 Medium',   value: 18  },
  { label: '⚡ Fast',     value: 4   },
  { label: '💨 Instant',  value: 0   },
];

export const PATH_ALGORITHMS = [
  {
    id: 'dfs',
    name: 'DFS — Backtracking',
    description:
      'Depth-First Search dives as deep as possible along each branch, then backtracks. Uses an explicit LIFO stack. Does NOT guarantee the shortest path — useful for demonstrating backtracking mechanics.',
    complexity: 'O(V + E)',
    guaranteed: false,
    color: '#fb923c',
  },
  {
    id: 'bfs',
    name: 'BFS — Breadth-First',
    description:
      'Breadth-First Search explores all cells at the current depth level before going deeper. Uses a FIFO queue. Guarantees the shortest path in unweighted graphs.',
    complexity: 'O(V + E)',
    guaranteed: true,
    color: '#38bdf8',
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    description:
      "Processes cells in order of their cumulative distance from the start using a min-heap. Guarantees the shortest path. Foundation of GPS routing and network protocols.",
    complexity: 'O((V + E) log V)',
    guaranteed: true,
    color: '#c084fc',
  },
  {
    id: 'astar',
    name: 'A* Search',
    description:
      "Combines Dijkstra's with a heuristic (Manhattan distance) to guide the search toward the goal. Fewer nodes explored than Dijkstra's. Guarantees the shortest path.",
    complexity: 'O(E log V)',
    guaranteed: true,
    color: '#34d399',
  },
];

export const MAZE_ALGORITHMS = [
  {
    id: 'recursiveBacktracking',
    name: 'Recursive Backtracking (DFS)',
    description:
      'Uses DFS to carve passages. Starts with all walls and digs through, backtracking when trapped. Produces long, winding corridors with few dead ends.',
  },
  {
    id: 'prims',
    name: "Prim's Algorithm",
    description:
      "Grows the maze from a seed by randomly picking adjacent frontier cells. Creates mazes with many short dead ends — visually similar to a bush-shaped tree.",
  },
  {
    id: 'kruskals',
    name: "Kruskal's Algorithm",
    description:
      'Randomly removes walls between disconnected components using a Union-Find (Disjoint Set) data structure. Highly uniform mazes with balanced branching.',
  },
  {
    id: 'recursiveDivision',
    name: 'Recursive Division',
    description:
      'Starts with an open grid and recursively adds walls with a single passage each time. Produces mazes with long straight corridors and a room-like structure.',
  },
  {
    id: 'random',
    name: 'Scatter (Random Walls)',
    description:
      'Randomly scatters walls at ~30% density. Fast, open layout useful for quickly testing pathfinding algorithms.',
  },
];

// Maze types that start from an all-wall state (carve outwards)
export const CARVE_MAZES = new Set(['recursiveBacktracking', 'prims', 'kruskals']);
