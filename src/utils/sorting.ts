import { PlayerData, SortField, SortDirection } from '../types';

function getCellValue(player: PlayerData, field: SortField): number | string | null {
  switch (field) {
    case 'name':
      return player.name;
    case 'position':
      return player.position;
    case 'team':
      return player.team;
    case 'medianAdp':
      return player.medianAdp;
    case 'bestAdp':
      return player.bestAdp;
    case 'worstAdp':
      return player.worstAdp;
    case 'adpSpread':
      return player.adpSpread;
    case 'sleeper':
      return player.adp.sleeper;
    case 'mfl':
      return player.adp.mfl;
    case 'espn':
      return player.adp.espn;
    case 'fantasypros':
      return player.adp.fantasypros;
    default:
      return null;
  }
}

export function sortPlayers(
  players: PlayerData[],
  field: SortField,
  direction: SortDirection,
): PlayerData[] {
  const sorted = [...players];

  sorted.sort((a, b) => {
    const aVal = getCellValue(a, field);
    const bVal = getCellValue(b, field);

    // Nulls always sort to the end regardless of direction
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    let cmp = 0;
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      cmp = aVal.localeCompare(bVal);
    } else if (typeof aVal === 'number' && typeof bVal === 'number') {
      cmp = aVal - bVal;
    }

    return direction === 'asc' ? cmp : -cmp;
  });

  return sorted;
}
