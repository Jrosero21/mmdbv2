import React from 'react';


export const GENRES = [
  { id: 0, name: 'All' },      
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
];

export default function CategoryChips({ selected = [], onToggle }) {
  const isAll = selected.length === 0;

  const handleClick = (id) => {
    if (id === 0) {
    
      onToggle('clear');
    } else {
      onToggle(id);
    }
  };

  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      {GENRES.map((g) => {
        const active = g.id === 0 ? isAll : selected.includes(g.id);
        const cls = active ? 'btn btn-primary' : 'btn btn-outline-primary';
        return (
          <button
            key={g.id}
            type="button"
            className={`${cls} btn-sm rounded-pill`}
            onClick={() => handleClick(g.id)}
          >
            {g.name}
          </button>
        );
      })}

      <style>{`
        .btn-outline-primary { border-width: 1px; }
      `}</style>
    </div>
  );
}
