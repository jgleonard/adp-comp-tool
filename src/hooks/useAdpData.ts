import { useState, useEffect, useCallback, useMemo } from 'react';
import { PlayerData, SourceName, SourceInfo } from '../types';
import { computeDynamicAdpForAll } from '../utils/dynamicAdp';

import mergedData from '../data/merged.json';

interface MergedData {
  lastUpdated: string;
  players: PlayerData[];
}

const SOURCE_INFOS: SourceInfo[] = [
  { name: 'sleeper', label: 'Sleeper', color: '#00796b', active: true },
  { name: 'mfl', label: 'MFL', color: '#c62828', active: true },
  { name: 'espn', label: 'ESPN', color: '#d32f2f', active: true },
];

export function useAdpData() {
  const [rawPlayers, setRawPlayers] = useState<PlayerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sources, setSources] = useState<SourceInfo[]>(SOURCE_INFOS);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const data = mergedData as unknown as MergedData;
    setRawPlayers(data.players);
    setLastUpdated(data.lastUpdated);
    setIsLoading(false);
  }, []);

  const toggleSource = useCallback((name: SourceName) => {
    setSources(prev =>
      prev.map(s => (s.name === name ? { ...s, active: !s.active } : s)),
    );
  }, []);

  const activeSourceNames = useMemo(
    () => sources.filter(s => s.active).map(s => s.name),
    [sources],
  );

  const players = useMemo(
    () => computeDynamicAdpForAll(rawPlayers, activeSourceNames),
    [rawPlayers, activeSourceNames],
  );

  return { players, isLoading, sources, toggleSource, lastUpdated };
}
