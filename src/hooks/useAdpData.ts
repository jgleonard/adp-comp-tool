import { useState, useEffect, useCallback } from 'react';
import { PlayerData, SourceName, SourceInfo } from '../types';

import mergedData from '../data/merged.json';

interface MergedData {
  lastUpdated: string;
  players: PlayerData[];
}

const SOURCE_INFOS: SourceInfo[] = [
  { name: 'sleeper', label: 'Sleeper', color: '#00796b', active: true },
  { name: 'mfl', label: 'MFL', color: '#c62828', active: true },
  { name: 'espn', label: 'ESPN', color: '#d32f2f', active: true },
  { name: 'fantasypros', label: 'FantasyPros', color: '#e65100', active: true },
];

export function useAdpData() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sources, setSources] = useState<SourceInfo[]>(SOURCE_INFOS);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const data = mergedData as unknown as MergedData;
    setPlayers(data.players);
    setLastUpdated(data.lastUpdated);
    setIsLoading(false);
  }, []);

  const toggleSource = useCallback((name: SourceName) => {
    setSources(prev =>
      prev.map(s => (s.name === name ? { ...s, active: !s.active } : s)),
    );
  }, []);

  return { players, isLoading, sources, toggleSource, lastUpdated };
}
