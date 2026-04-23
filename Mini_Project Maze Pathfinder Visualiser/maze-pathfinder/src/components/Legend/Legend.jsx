import './Legend.css';

const ITEMS = [
  { color: '#8be9fd', label: 'Start Cell',          dot: true  },
  { color: '#ff79c6', label: 'End Cell',             dot: true  },
  { color: '#f1fa8c', label: 'Current (Gen)',        dot: true  },
  { color: '#1a1f3c', label: 'Generated Passage',    dot: true  },
  { color: '#3d1f6b', label: 'Visited (Search)',     dot: true  },
  { color: '#ff5555', label: 'Frontier / Open Set',  dot: true  },
  { color: '#50fa7b', label: 'Solution Path',        dot: true  },
  { color: '#6272a4', label: 'Wall',                 dot: false, wall: true },
];

const Legend = () => (
  <div className="legend">
    <span className="legend-title">Legend</span>
    <div className="legend-items">
      {ITEMS.map(({ color, label, dot, wall }) => (
        <div key={label} className="legend-item">
          {wall
            ? <span className="legend-wall" style={{ borderColor: color }} />
            : <span className="legend-dot" style={{ background: color, boxShadow: `0 0 6px ${color}88` }} />
          }
          <span className="legend-label">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Legend;