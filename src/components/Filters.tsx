import { useCallback } from 'react';
import { Position, FilterState } from '../types';

interface FiltersProps {
  filterState: FilterState;
  onPositionToggle: (pos: Position) => void;
  onMinAdpChange: (value: number | null) => void;
  onMaxAdpChange: (value: number | null) => void;
  onMinSourcesChange: (value: number) => void;
  allPositions: Position[];
}

export default function Filters({
  filterState,
  onPositionToggle,
  onMinAdpChange,
  onMaxAdpChange,
  onMinSourcesChange,
  allPositions,
}: FiltersProps) {
  const handlePositionClick = useCallback(
    (pos: Position) => {
      onPositionToggle(pos);
    },
    [onPositionToggle],
  );

  const isActive = (pos: Position) => filterState.positions.includes(pos);

  return (
    <div className="flex flex-wrap items-end gap-4 sm:gap-6">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-slate-light dark:text-slate-400 mr-1">Pos:</span>
        {allPositions.map(pos => (
          <button
            key={pos}
            type="button"
            onClick={() => handlePositionClick(pos)}
            className={`rounded-md px-2 py-0.5 text-xs font-medium transition-smooth ${
              isActive(pos)
                ? 'bg-navy dark:bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-slate-light dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-slate dark:hover:text-gray-200'
            }`}
          >
            {pos}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-slate-light dark:text-slate-400">Min sources:</span>
        <div className="flex rounded-md border border-gray-200 dark:border-gray-600 overflow-hidden">
          {[1, 2, 3, 4].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => onMinSourcesChange(n)}
              className={`px-2 py-0.5 text-xs font-medium transition-smooth ${
                filterState.minSources === n
                  ? 'bg-navy dark:bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-slate-light dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-light dark:text-slate-400">ADP:</span>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min={0}
              max={500}
              value={filterState.minAdp ?? ''}
              onChange={e => onMinAdpChange(e.target.value === '' ? null : Number(e.target.value))}
              className="w-16 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 text-xs font-mono text-right text-navy dark:text-gray-100 outline-none focus:border-blue dark:focus:border-blue-400 focus:ring-2 focus:ring-blue/10 dark:focus:ring-blue-400/10 placeholder:text-slate-light dark:placeholder:text-slate-500"
              placeholder="Min"
            />
            <span className="text-xs text-slate-light dark:text-slate-400">—</span>
            <input
              type="number"
              min={0}
              max={500}
              value={filterState.maxAdp ?? ''}
              onChange={e => onMaxAdpChange(e.target.value === '' ? null : Number(e.target.value))}
              className="w-16 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 text-xs font-mono text-right text-navy dark:text-gray-100 outline-none focus:border-blue dark:focus:border-blue-400 focus:ring-2 focus:ring-blue/10 dark:focus:ring-blue-400/10 placeholder:text-slate-light dark:placeholder:text-slate-500"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
