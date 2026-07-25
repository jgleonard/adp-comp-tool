import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFilters } from '../hooks/useFilters';
import { PlayerData, FilterState } from '../types';

const mockPlayers: PlayerData[] = [
  {
    id: 'qb_josh_allen',
    name: 'Josh Allen',
    position: 'QB',
    team: 'BUF',
    adp: { sleeper: 7, mfl: 9, espn: 8 },
    medianAdp: 8,
    bestAdp: 7,
    worstAdp: 9,
    adpSpread: 2,
  },
  {
    id: 'rb_christian_mccaffrey',
    name: 'Christian McCaffrey',
    position: 'RB',
    team: 'SF',
    adp: { sleeper: 2, mfl: 3, espn: 1 },
    medianAdp: 2,
    bestAdp: 1,
    worstAdp: 3,
    adpSpread: 2,
  },
  {
    id: 'wr_justin_jefferson',
    name: 'Justin Jefferson',
    position: 'WR',
    team: 'MIN',
    adp: { sleeper: 3, mfl: null, espn: 4 },
    medianAdp: 3.5,
    bestAdp: 3,
    worstAdp: 4,
    adpSpread: 1,
  },
];

const defaultFilterState: FilterState = {
  search: '',
  positions: [],
  sources: [],
  minSources: 0,
  minAdp: null,
  maxAdp: null,
};

describe('useFilters', () => {
  it('returns all players with no filters', () => {
    const { result } = renderHook(() => useFilters(mockPlayers, defaultFilterState));
    expect(result.current.filteredPlayers).toHaveLength(3);
  });

  it('filters by search query (name)', () => {
    const filterState: FilterState = { ...defaultFilterState, search: 'josh' };
    const { result } = renderHook(() => useFilters(mockPlayers, filterState));
    expect(result.current.filteredPlayers).toHaveLength(1);
    expect(result.current.filteredPlayers[0].name).toBe('Josh Allen');
  });

  it('filters by search query (team)', () => {
    const filterState: FilterState = { ...defaultFilterState, search: 'sf' };
    const { result } = renderHook(() => useFilters(mockPlayers, filterState));
    expect(result.current.filteredPlayers).toHaveLength(1);
    expect(result.current.filteredPlayers[0].team).toBe('SF');
  });

  it('filters by position', () => {
    const filterState: FilterState = { ...defaultFilterState, positions: ['QB'] };
    const { result } = renderHook(() => useFilters(mockPlayers, filterState));
    expect(result.current.filteredPlayers).toHaveLength(1);
    expect(result.current.filteredPlayers[0].position).toBe('QB');
  });

  it('filters by multiple positions', () => {
    const filterState: FilterState = { ...defaultFilterState, positions: ['QB', 'RB'] };
    const { result } = renderHook(() => useFilters(mockPlayers, filterState));
    expect(result.current.filteredPlayers).toHaveLength(2);
  });

  it('filters by min sources', () => {
    const filterState: FilterState = { ...defaultFilterState, minSources: 3 };
    const { result } = renderHook(() => useFilters(mockPlayers, filterState));
    expect(result.current.filteredPlayers).toHaveLength(2);
    expect(result.current.filteredPlayers.every(p => p.id !== 'wr_justin_jefferson')).toBe(true);
  });

  it('filters by min ADP', () => {
    const filterState: FilterState = { ...defaultFilterState, minAdp: 5 };
    const { result } = renderHook(() => useFilters(mockPlayers, filterState));
    expect(result.current.filteredPlayers).toHaveLength(1);
    expect(result.current.filteredPlayers[0].name).toBe('Josh Allen');
  });

  it('filters by max ADP', () => {
    const filterState: FilterState = { ...defaultFilterState, maxAdp: 4 };
    const { result } = renderHook(() => useFilters(mockPlayers, filterState));
    expect(result.current.filteredPlayers).toHaveLength(2);
    expect(result.current.filteredPlayers[0].name).toBe('Christian McCaffrey');
    expect(result.current.filteredPlayers[1].name).toBe('Justin Jefferson');
  });

  it('filters by ADP range', () => {
    const filterState: FilterState = { ...defaultFilterState, minAdp: 2, maxAdp: 4 };
    const { result } = renderHook(() => useFilters(mockPlayers, filterState));
    expect(result.current.filteredPlayers).toHaveLength(2);
  });

  it('combines search and position filters', () => {
    const filterState: FilterState = { ...defaultFilterState, search: 'j', positions: ['WR'] };
    const { result } = renderHook(() => useFilters(mockPlayers, filterState));
    expect(result.current.filteredPlayers).toHaveLength(1);
    expect(result.current.filteredPlayers[0].name).toBe('Justin Jefferson');
  });

  it('returns togglePosition function', () => {
    const { result } = renderHook(() => useFilters(mockPlayers, defaultFilterState));
    const toggle = result.current.togglePosition('QB');
    const newPos = toggle([]);
    expect(newPos).toContain('QB');
  });

  it('toggles position off', () => {
    const { result } = renderHook(() => useFilters(mockPlayers, defaultFilterState));
    const toggle = result.current.togglePosition('QB');
    const newPos = toggle(['QB', 'RB']);
    expect(newPos).not.toContain('QB');
    expect(newPos).toContain('RB');
  });

  it('returns all positions', () => {
    const { result } = renderHook(() => useFilters(mockPlayers, defaultFilterState));
    expect(result.current.allPositions).toContain('QB');
    expect(result.current.allPositions).toContain('RB');
    expect(result.current.allPositions).toContain('WR');
    expect(result.current.allPositions).toContain('TE');
  });
});
