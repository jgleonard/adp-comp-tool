export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF' | 'OP';

export type SourceName = 'sleeper' | 'mfl' | 'espn';

export interface AdpSources {
  sleeper: number | null;
  mfl: number | null;
  espn: number | null;
}

export interface PlayerData {
  id: string;
  name: string;
  position: Position;
  team: string;
  adp: AdpSources;
  medianAdp: number | null;
  bestAdp: number | null;
  worstAdp: number | null;
  adpSpread: number | null;
}

export type SortField = 'name' | 'position' | 'team' | 'medianAdp' | 'bestAdp' | 'worstAdp' | 'adpSpread' | SourceName;
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterState {
  search: string;
  positions: Position[];
  sources: SourceName[];
  minAdp: number | null;
  maxAdp: number | null;
  minSources: number;
}

export interface SourceInfo {
  name: SourceName;
  label: string;
  color: string;
  active: boolean;
}
