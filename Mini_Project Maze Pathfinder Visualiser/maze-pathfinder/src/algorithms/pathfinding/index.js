export { dfs }      from './dfs';
export { bfs }      from './bfs';
export { astar }    from './astar';
export { dijkstra } from './dijkstra';

export const PATH_ALGORITHMS = {
  dfs: {
    label: 'DFS (Backtracking)',
    fn: 'dfs',
    desc: 'Explores as deep as possible, then backtracks. No shortest-path guarantee.',
    complexity: 'O(V+E) time · O(V) space',
    badge: 'DFS',
    guaranteesShortestPath: false,
  },
  bfs: {
    label: 'BFS',
    fn: 'bfs',
    desc: 'Level-by-level exploration. Guarantees shortest path on unweighted graphs.',
    complexity: 'O(V+E) time · O(V) space',
    badge: 'BFS',
    guaranteesShortestPath: true,
  },
  astar: {
    label: 'A* Search',
    fn: 'astar',
    desc: 'Uses Manhattan heuristic to focus toward goal. Optimal and usually fastest.',
    complexity: 'O(V log V) time · O(V) space',
    badge: 'A*',
    guaranteesShortestPath: true,
  },
  dijkstra: {
    label: "Dijkstra's",
    fn: 'dijkstra',
    desc: 'Uniform-cost search. Optimal for weighted graphs; like BFS here.',
    complexity: 'O((V+E) log V) time · O(V) space',
    badge: 'DIJKSTRA',
    guaranteesShortestPath: true,
  },
};