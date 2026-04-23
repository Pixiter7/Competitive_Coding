export { recursiveBacktracking } from './recursiveBacktracking';
export { prims }                 from './prims';
export { kruskals }              from './kruskals';
export { recursiveDivision }     from './recursiveDivision';

export const MAZE_ALGORITHMS = {
  recursiveBacktracking: {
    label: 'Recursive Backtracking',
    fn: 'recursiveBacktracking',
    desc: 'DFS-based carving. Creates long winding corridors with few dead-ends.',
    complexity: 'O(V) time · O(V) space',
    badge: 'DFS',
  },
  prims: {
    label: "Randomized Prim's",
    fn: 'prims',
    desc: 'Grows the maze from a seed, producing many short branches and a bushy feel.',
    complexity: 'O(V log V) time · O(V) space',
    badge: 'GREEDY',
  },
  kruskals: {
    label: "Randomized Kruskal's",
    fn: 'kruskals',
    desc: 'Shuffles all edges and merges cells with Union-Find. Uniform random maze.',
    complexity: 'O(E α(V)) time · O(V) space',
    badge: 'UNION-FIND',
  },
  recursiveDivision: {
    label: 'Recursive Division',
    fn: 'recursiveDivision',
    desc: 'Starts open and adds walls recursively. Creates rooms and straight corridors.',
    complexity: 'O(V) time · O(log V) stack',
    badge: 'DIVIDE',
  },
};