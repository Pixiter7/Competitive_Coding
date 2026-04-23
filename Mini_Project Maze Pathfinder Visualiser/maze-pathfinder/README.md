# 🌀 Maze Pathfinder — DAA Visualization

A full-featured, interactive maze generation and pathfinding visualizer built as a
**Design & Analysis of Algorithms (DAA)** project. Watch algorithms carve mazes and
find paths in real time with a cinematic dark-neon UI.

---

## ✨ Features

| Category             | Options                                                                 |
|----------------------|-------------------------------------------------------------------------|
| **Maze Generation**  | Recursive Backtracking · Prim's · Kruskal's · Recursive Division        |
| **Pathfinding**      | DFS (Backtracking) · BFS · A\* · Dijkstra's                             |
| **Grid Sizes**       | Tiny (11×11) → Huge (41×41) with 5 quick presets                       |
| **Speed Control**    | Exponential slider from ~600 ms/step (slow) to ~1 ms/step (blazing)    |
| **Visualization**    | Canvas-based rendering with glow effects, live statistics               |
| **Controls**         | Generate · Solve · Clear Path · Reset · Pause · Resume                  |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18  
- **npm** ≥ 9

### Install & Run

```bash
# 1. Clone / download the project
cd maze-pathfinder

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

---

## 🗂 Project Structure

```
maze-pathfinder/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Root layout
    ├── App.css                   # Global styles (Dracula-inspired palette)
    │
    ├── utils/
    │   └── mazeUtils.js          # Grid factory, frame application, helpers
    │
    ├── hooks/
    │   └── useMazeVisualizer.js  # Central state + animation engine
    │
    ├── algorithms/
    │   ├── maze/
    │   │   ├── recursiveBacktracking.js
    │   │   ├── prims.js
    │   │   ├── kruskals.js
    │   │   ├── recursiveDivision.js
    │   │   └── index.js          # Exports + metadata
    │   └── pathfinding/
    │       ├── dfs.js
    │       ├── bfs.js
    │       ├── astar.js
    │       ├── dijkstra.js
    │       └── index.js
    │
    └── components/
        ├── MazeGrid/             # Canvas renderer
        ├── Controls/             # Full control panel
        └── Legend/               # Colour legend
```

---

## 🧩 Algorithm Details

### Maze Generation

| Algorithm               | Strategy                          | Complexity          | Maze Quality                    |
|-------------------------|-----------------------------------|---------------------|---------------------------------|
| Recursive Backtracking  | Iterative DFS + random neighbour  | O(V) time/space     | Long winding corridors          |
| Randomized Prim's       | Frontier set, random wall remove  | O(V log V)          | Short branches, bushy texture   |
| Randomized Kruskal's    | Union-Find, shuffle all edges     | O(E α(V))           | Uniform random, many dead-ends  |
| Recursive Division      | Divide chambers, add single gaps  | O(V)                | Rooms + long straight passages  |

All algorithms produce **perfect mazes** (exactly one path between any two cells).

### Pathfinding

| Algorithm  | Strategy             | Shortest Path | Complexity          |
|------------|----------------------|---------------|---------------------|
| DFS        | Stack + backtracking | ✗             | O(V+E) time/space   |
| BFS        | Level-by-level queue | ✓             | O(V+E) time/space   |
| A\*        | BFS + Manhattan h()  | ✓             | O(V log V)          |
| Dijkstra's | Priority queue       | ✓             | O((V+E) log V)      |

---

## 🎨 Colour Legend

| Colour   | Meaning                      |
|----------|------------------------------|
| 🔵 Cyan  | Start cell (S)               |
| 🩷 Pink  | End cell (E)                 |
| 🟡 Yellow| Current cell (generation)    |
| 🟣 Dark  | Visited during pathfinding   |
| 🔴 Red   | Frontier / open set          |
| 🟢 Green | Solution path                |
| ⬛ Dark  | Generated (carved) passage   |
| — Gray — | Wall                         |

---

## 🛠 Tech Stack

- **React 18** — UI rendering
- **Vite 5** — Build tool & dev server
- **HTML5 Canvas** — High-performance maze rendering
- **CSS Custom Properties** — Dracula-inspired palette
- **Syne + Space Mono** — Typography

---

## 📚 References

- Introduction to Algorithms (CLRS), 4th Edition
- Maze generation algorithms — jamis.github.io
- A* Search Algorithm — Hart, Nilsson, Raphael (1968)