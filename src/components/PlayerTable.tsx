import { useCallback } from 'react';
import { PlayerData, SourceInfo, SortConfig, SortField } from '../types';
import PlayerRow from './PlayerRow';

interface PlayerTableProps {
  players: PlayerData[];
  sortConfig: SortConfig | null;
  onSort: (field: SortField) => void;
  sources: SourceInfo[];
  minSources: number;
  onRowClick: (player: PlayerData) => void;
}

function SortArrow({ field, config }: { field: SortField; config: SortConfig | null }) {
  if (config?.field !== field) return null;
  return (
    <span className="ml-0.5 text-slate-light dark:text-slate-400">
      {config.direction === 'asc' ? '↑' : '↓'}
    </span>
  );
}

export default function PlayerTable({
  players,
  sortConfig,
  onSort,
  sources,
  minSources,
  onRowClick,
}: PlayerTableProps) {
  const handleSort = useCallback(
    (field: SortField) => {
      onSort(field);
    },
    [onSort],
  );

  const activeSources = sources.filter(s => s.active);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200/80 dark:border-gray-700/60 bg-white dark:bg-gray-800">
      <table className="table-auto border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="sticky left-0 z-20 bg-gray-50/95 dark:bg-gray-800/95 py-2.5 px-3 text-center font-medium text-xs uppercase tracking-wider text-slate-light dark:text-slate-400 w-10">
              #
            </th>
            <th className="sticky left-10 z-20 bg-gray-50/95 dark:bg-gray-800/95 py-2.5 pl-1 pr-3 text-left font-medium text-xs uppercase tracking-wider text-slate-light dark:text-slate-400">
              <button
                type="button"
                onClick={() => handleSort('name')}
                className="flex items-center hover:text-navy dark:hover:text-gray-200 transition-colors"
              >
                Name
                <SortArrow field="name" config={sortConfig} />
              </button>
            </th>
            <th className="py-2.5 px-2 text-center font-medium text-xs uppercase tracking-wider text-slate-light dark:text-slate-400 sm:hidden">
              Pos
            </th>
            {activeSources.map(source => (
              <th key={source.name} className="py-2.5 px-3 text-center font-medium text-xs uppercase tracking-wider text-slate-light dark:text-slate-400 whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => handleSort(source.name)}
                  className="flex items-center justify-center hover:text-navy dark:hover:text-gray-200 transition-colors gap-0.5"
                >
                  {source.label}
                  <SortArrow field={source.name} config={sortConfig} />
                </button>
              </th>
            ))}
            <th className="py-2.5 px-3 text-center font-medium text-xs uppercase tracking-wider text-slate-light dark:text-slate-400 whitespace-nowrap">
              <button
                type="button"
                onClick={() => handleSort('medianAdp')}
                className="flex items-center justify-center hover:text-navy dark:hover:text-gray-200 transition-colors gap-0.5"
              >
                Median
                <SortArrow field="medianAdp" config={sortConfig} />
              </button>
            </th>
            <th className="py-2.5 px-3 text-center font-medium text-xs uppercase tracking-wider text-slate-light dark:text-slate-400 whitespace-nowrap">
              <button
                type="button"
                onClick={() => handleSort('bestAdp')}
                className="flex items-center justify-center hover:text-navy dark:hover:text-gray-200 transition-colors gap-0.5"
              >
                Best
                <SortArrow field="bestAdp" config={sortConfig} />
              </button>
            </th>
            <th className="py-2.5 px-3 text-center font-medium text-xs uppercase tracking-wider text-slate-light dark:text-slate-400 whitespace-nowrap">
              <button
                type="button"
                onClick={() => handleSort('worstAdp')}
                className="flex items-center justify-center hover:text-navy dark:hover:text-gray-200 transition-colors gap-0.5"
              >
                Worst
                <SortArrow field="worstAdp" config={sortConfig} />
              </button>
            </th>
            <th className="py-2.5 px-3 text-center font-medium text-xs uppercase tracking-wider text-slate-light dark:text-slate-400 whitespace-nowrap">
              <button
                type="button"
                onClick={() => handleSort('adpSpread')}
                className="flex items-center justify-center hover:text-navy dark:hover:text-gray-200 transition-colors gap-0.5"
              >
                Spread
                <SortArrow field="adpSpread" config={sortConfig} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {players.length === 0 ? (
            <tr>
              <td
                colSpan={4 + activeSources.length + 4}
                className="py-24 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-sm font-medium text-slate dark:text-slate-400">No players found</p>
                  <p className="text-xs text-slate-light dark:text-slate-500">Try adjusting your search or filters</p>
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
                onClick={() => onRowClick(player)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
