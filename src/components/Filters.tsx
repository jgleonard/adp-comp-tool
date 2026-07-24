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
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Position filters */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate">
            Position
          </label>
          <div className="flex flex-wrap gap-1.5">
            {allPositions.map(pos => (
              <button
                key={pos}
                type="button"
                onClick={() => handlePositionClick(pos)}
                className={`pos-badge rounded-md px-2.5 py-1 text-xs font-semibold transition-smooth ${
                  isActive(pos)
                    ? 'ring-2 ring-blue ring-offset-1'
                    : 'bg-gray-100 text-slate-light hover:bg-gray-200 hover:text-slate'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Min sources selector */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate">
            Min Sources
          </label>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => onMinSourcesChange(n)}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition-smooth ${
                  filterState.minSources === n
                    ? 'bg-blue text-white shadow-sm'
                    : 'bg-gray-100 text-slate-light hover:bg-gray-200 hover:text-slate'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate">
            ADP Range
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-xs text-slate-light w-8">Min</span>
              <input
                type="range"
                min={0}
                max={200}
                step={1}
                value={filterState.minAdp ?? 0}
                onChange={e => onMinAdpChange(Number(e.target.value))}
                className="flex-1 accent-blue"
              />
              <span className="w-10 shrink-0 font-mono text-right text-sm font-medium text-navy">
                {filterState.minAdp ?? 0}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-xs text-slate-light w-8">Max</span>
              <input
                type="range"
                min={0}
                max={500}
                step={1}
                value={filterState.maxAdp ?? 500}
                onChange={e => onMaxAdpChange(Number(e.target.value))}
                className="flex-1 accent-blue"
              />
              <span className="w-10 shrink-0 font-mono text-right text-sm font-medium text-navy">
                {filterState.maxAdp}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
