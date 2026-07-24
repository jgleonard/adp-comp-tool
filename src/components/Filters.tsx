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
    <div className="space-y-4">
      {/* Position filters */}
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate">
          Position
        </label>
        <div className="flex flex-wrap gap-2">
          {allPositions.map(pos => (
            <button
              key={pos}
              type="button"
              onClick={() => handlePositionClick(pos)}
              className={`pos-badge rounded-md px-3 py-1.5 text-xs font-semibold transition-smooth ${
                isActive(pos)
                  ? 'ring-2 ring-blue ring-offset-1'
                  : 'bg-gray-100 text-slate hover:bg-gray-200'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {/* ADP Range sliders */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate">
            Min Median ADP
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={200}
              step={1}
              value={filterState.minAdp ?? 0}
              onChange={e => onMinAdpChange(Number(e.target.value))}
              className="flex-1 accent-blue"
            />
            <span className="w-10 font-mono text-right text-sm text-navy">
              {filterState.minAdp ?? 0}
            </span>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate">
            Max Median ADP
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={500}
              step={1}
              value={filterState.maxAdp ?? 500}
              onChange={e => onMaxAdpChange(Number(e.target.value))}
              className="flex-1 accent-blue"
            />
            <span className="w-10 font-mono text-right text-sm text-navy">
              {filterState.maxAdp}
            </span>
          </div>
        </div>
      </div>

      {/* Min sources selector */}
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate">
          Min Sources
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => onMinSourcesChange(n)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-smooth ${
                filterState.minSources === n
                  ? 'bg-blue text-white'
                  : 'bg-gray-100 text-slate hover:bg-gray-200'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
