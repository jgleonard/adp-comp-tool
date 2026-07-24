import { useCallback } from 'react';
import { PlayerData, SourceInfo, SortConfig, SortField } from '../types';
import PlayerRow from './PlayerRow';

interface PlayerTableProps {
  players: PlayerData[];
  sortConfig: SortConfig | null;
  onSort: (field: SortField) => void;
  sources: SourceInfo[];
  minSources: number;
}

function getSortArrow(direction: 'asc' | 'desc' | null): string {
  if (direction === 'asc') return ' \u2191';
  if (direction === 'desc') return ' \u2193';
  return '';
}

export default function PlayerTable({
  players,
  sortConfig,
  onSort,
  sources,
  minSources,
}: PlayerTableProps) {
  const handleSort = useCallback(
    (field: SortField) => {
      onSort(field);
    },
    [onSort],
  );

  const activeSources = sources.filter(s => s.active);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-navy text-white">
            <th className="sticky left-0 z-20 bg-navy py-3 px-3 text-center font-semibold w-10">
              #
            </th>
            <th className="sticky left-12 z-20 bg-navy py-3 pl-1 pr-3 text-left font-semibold md:left-20">
              <button
                type="button"
                onClick={() => handleSort('name')}
                className="hover:text-teal transition-smooth"
              >
                Name{getSortArrow(sortConfig?.direction ?? null)}
              </button>
            </th>
            <th className="sticky left-48 z-20 bg-navy py-3 pr-3 text-center font-semibold sm:hidden md:left-52">
              Pos
            </th>
            {activeSources.map(source => (
              <th key={source.name} className="py-3 px-3 text-center font-semibold">
                <button
                  type="button"
                  onClick={() => handleSort(source.name)}
                  className="hover:text-teal transition-smooth"
                  style={{ color: source.color }}
                >
                  {source.label}{getSortArrow(sortConfig?.direction ?? null)}
                </button>
              </th>
            ))}
            <th className="py-3 px-3 text-center font-semibold">
              <button
                type="button"
                onClick={() => handleSort('medianAdp')}
                className="hover:text-teal transition-smooth"
              >
                Median{getSortArrow(sortConfig?.direction ?? null)}
              </button>
            </th>
            <th className="py-3 px-3 text-center font-semibold">
              <button
                type="button"
                onClick={() => handleSort('bestAdp')}
                className="hover:text-teal transition-smooth"
              >
                Best{getSortArrow(sortConfig?.direction ?? null)}
              </button>
            </th>
            <th className="py-3 px-3 text-center font-semibold">
              <button
                type="button"
                onClick={() => handleSort('worstAdp')}
                className="hover:text-teal transition-smooth"
              >
                Worst{getSortArrow(sortConfig?.direction ?? null)}
              </button>
            </th>
            <th className="py-3 px-3 text-center font-semibold">
              <button
                type="button"
                onClick={() => handleSort('adpSpread')}
                className="hover:text-teal transition-smooth"
              >
                Spread{getSortArrow(sortConfig?.direction ?? null)}
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-card">
          {players.length === 0 ? (
            <tr>
              <td
                colSpan={4 + activeSources.length + 4}
                className="py-16 text-center text-slate"
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className="h-8 w-8 text-slate-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-sm font-medium">No players match the current filters.</span>
                  <span className="text-xs text-slate-light">Try adjusting your search or filter criteria.</span>
                </div>
              </td>
            </tr>
          ) : (
            players.map((player, index) => (
              <PlayerRow
                key={player.id}
                player={player}
                rank={index + 1}
                sources={sources}
                minSources={minSources}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
