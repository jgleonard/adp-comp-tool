import { useState, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import SearchBar from './SearchBar';
import Filters from './Filters';
import SourceToggle from './SourceToggle';
import PlayerTable from './PlayerTable';
import PlayerModal from './PlayerModal';
import { useAdpData } from '../hooks/useAdpData';
import { useFilters } from '../hooks/useFilters';
import { useSorting } from '../hooks/useSorting';
import { FilterState, PlayerData, Position, SortConfig, SortField, SourceName } from '../types';

const DEFAULT_FILTERS: FilterState = {
  search: '',
  positions: [],
  sources: ['sleeper', 'mfl', 'espn', 'fantasypros'],
  minAdp: null,
  maxAdp: 500,
  minSources: 1,
};

export default function App() {
  const { players, isLoading, sources, toggleSource, lastUpdated } = useAdpData();

  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({ field: 'medianAdp', direction: 'asc' });
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);

  const { filteredPlayers, togglePosition } = useFilters(players, filterState);
  const { sortedPlayers, onSort } = useSorting(filteredPlayers, sortConfig);

  const handleSearchChange = useCallback((value: string) => {
    setFilterState(prev => ({ ...prev, search: value }));
  }, []);

  const handlePositionToggle = useCallback(
    (pos: Position) => {
      setFilterState(prev => ({
        ...prev,
        positions: togglePosition(pos)(prev.positions),
      }));
    },
    [togglePosition],
  );

  const handleMinAdpChange = useCallback((value: number | null) => {
    setFilterState(prev => ({ ...prev, minAdp: value }));
  }, []);

  const handleMaxAdpChange = useCallback((value: number | null) => {
    setFilterState(prev => ({ ...prev, maxAdp: value }));
  }, []);

  const handleMinSourcesChange = useCallback((value: number) => {
    setFilterState(prev => ({ ...prev, minSources: value }));
  }, []);

  const handleSourceToggle = useCallback(
    (name: SourceName) => {
      toggleSource(name);
    },
    [toggleSource],
  );

  const handleSort = useCallback(
    (field: SortField) => {
      setSortConfig(prev => onSort(field)(prev));
    },
    [onSort],
  );

  const handleRowClick = useCallback((player: PlayerData) => {
    setSelectedPlayer(player);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPlayer(null);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 animate-pulse-soft">
          <svg className="h-5 w-5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-sm text-slate-light">Loading player data...</p>
      </div>
    );
  }

  const hasActiveFilters = filterState.positions.length > 0 || filterState.search;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 animate-slide-up">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <SearchBar value={filterState.search} onChange={handleSearchChange} />
            <SourceToggle sources={sources} onToggle={handleSourceToggle} />
          </div>

          <div className="my-4 border-t border-gray-100" />

          <Filters
            filterState={filterState}
            onPositionToggle={handlePositionToggle}
            onMinAdpChange={handleMinAdpChange}
            onMaxAdpChange={handleMaxAdpChange}
            onMinSourcesChange={handleMinSourcesChange}
            allPositions={['QB', 'RB', 'WR', 'TE', 'K', 'DEF', 'OP']}
          />
        </div>

        <div className="mt-4 mb-3 flex items-center justify-between px-1">
          <span className="text-sm text-slate-light">
            <span className="font-semibold text-navy">{sortedPlayers.length}</span> player{sortedPlayers.length !== 1 ? 's' : ''}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => setFilterState({ ...DEFAULT_FILTERS, maxAdp: 500 })}
              className="rounded-full px-3 py-1 text-xs font-medium text-slate hover:text-navy hover:bg-gray-200/60 transition-smooth"
            >
              Clear filters
            </button>
          )}
        </div>

        <PlayerTable
          players={sortedPlayers}
          sortConfig={sortConfig}
          onSort={handleSort}
          sources={sources}
          minSources={filterState.minSources}
          onRowClick={handleRowClick}
        />
      </main>

      <Footer lastUpdated={lastUpdated} />

      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          sources={sources}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
