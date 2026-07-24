import { useState, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import SearchBar from './SearchBar';
import Filters from './Filters';
import SourceToggle from './SourceToggle';
import PlayerTable from './PlayerTable';
import { useAdpData } from '../hooks/useAdpData';
import { useFilters } from '../hooks/useFilters';
import { useSorting } from '../hooks/useSorting';
import { FilterState, Position, SortConfig, SortField, SourceName } from '../types';

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
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="text-slate">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Controls card */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-card p-4 shadow-sm sm:p-6">
          {/* Top row: Search + Source toggles */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate">
                Search
              </label>
              <SearchBar value={filterState.search} onChange={handleSearchChange} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate">
                Data Sources
              </label>
              <SourceToggle sources={sources} onToggle={handleSourceToggle} />
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-gray-100" />

          {/* Filters section */}
          <Filters
            filterState={filterState}
            onPositionToggle={handlePositionToggle}
            onMinAdpChange={handleMinAdpChange}
            onMaxAdpChange={handleMaxAdpChange}
            onMinSourcesChange={handleMinSourcesChange}
            allPositions={['QB', 'RB', 'WR', 'TE', 'K', 'DEF', 'OP']}
          />
        </div>

        {/* Table count */}
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="text-sm font-medium text-slate">
            {sortedPlayers.length} player{sortedPlayers.length !== 1 ? 's' : ''}
          </span>
          {(filterState.positions.length > 0 || filterState.search) && (
            <button
              type="button"
              onClick={() =>
                setFilterState({ ...DEFAULT_FILTERS, maxAdp: 500 })
              }
              className="rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue hover:bg-blue/20 transition-smooth"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Player table */}
        <PlayerTable
          players={sortedPlayers}
          sortConfig={sortConfig}
          onSort={handleSort}
          sources={sources}
          minSources={filterState.minSources}
        />
      </main>

      <Footer lastUpdated={lastUpdated} />
    </div>
  );
}
