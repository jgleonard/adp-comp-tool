import { useCallback, useMemo } from 'react';
import { PlayerData, SortConfig, SortField } from '../types';
import { sortPlayers } from '../utils/sorting';

export function useSorting(
  players: PlayerData[],
  sortConfig: SortConfig | null,
) {
  const sortedPlayers = useMemo(() => {
    if (!sortConfig) return players;
    return sortPlayers(players, sortConfig.field, sortConfig.direction);
  }, [players, sortConfig]);

  const onSort = useCallback(
    (field: SortField) => {
      return (current: SortConfig | null): SortConfig | null => {
        // If same field, cycle: asc → desc → null
        if (current && current.field === field) {
          if (current.direction === 'asc') {
            return { field, direction: 'desc' };
          }
          return null;
        }
        // New field → start with asc
        return { field, direction: 'asc' };
      };
    },
    [],
  );

  const getSortIndicator = useCallback(
    (field: SortField) => {
      if (!sortConfig || sortConfig.field !== field) return null;
      return sortConfig.direction;
    },
    [sortConfig],
  );

  return { sortedPlayers, onSort, getSortIndicator };
}
