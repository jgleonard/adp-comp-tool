import { useMemo, useCallback } from 'react';
import { PlayerData, Position, FilterState } from '../types';

const ALL_POSITIONS: Position[] = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF', 'OP'];

export function useFilters(players: PlayerData[], filterState: FilterState) {
  const filteredPlayers = useMemo(
    () =>
      players.filter(player => {
        // Search filter
        if (filterState.search) {
          const query = filterState.search.toLowerCase();
          const nameMatch = player.name.toLowerCase().includes(query);
          const teamMatch = player.team.toLowerCase().includes(query);
          if (!nameMatch && !teamMatch) return false;
        }

        // Position filter
        if (filterState.positions.length > 0 && !filterState.positions.includes(player.position)) {
          return false;
        }

        // Min sources filter: count how many non-null ADP values exist
        if (filterState.minSources > 0) {
          const adpValues = [
            player.adp.sleeper,
            player.adp.mfl,
            player.adp.espn,
          ].filter((v): v is number => v != null);
          if (adpValues.length < filterState.minSources) return false;
        }

        // ADP range filters (based on median)
        if (player.medianAdp != null) {
          if (filterState.minAdp != null && player.medianAdp < filterState.minAdp) return false;
          if (filterState.maxAdp != null && player.medianAdp > filterState.maxAdp) return false;
        }

        return true;
      }),
    [players, filterState],
  );

  const togglePosition = useCallback(
    (pos: Position) => {
      return (current: Position[]): Position[] => {
        if (current.includes(pos)) {
          return current.filter(p => p !== pos);
        }
        return [...current, pos];
      };
    },
    [],
  );

  return { filteredPlayers, togglePosition, allPositions: ALL_POSITIONS };
}
