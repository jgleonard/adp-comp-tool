import { PlayerData, SourceName } from '../types';

type RawPlayer = {
  id: string;
  name: string;
  position: string;
  team: string;
  adp: Partial<Record<SourceName, number | null>>;
};

export function computeMedian(arr: number[]): number | null {
  if (arr.length === 0) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1]! + sorted[mid]!) / 2;
  }
  return sorted[mid]!;
}

export function computeBest(arr: number[]): number | null {
  if (arr.length === 0) return null;
  return Math.min(...arr);
}

export function computeWorst(arr: number[]): number | null {
  if (arr.length === 0) return null;
  return Math.max(...arr);
}

export function computeSpread(best: number | null, worst: number | null): number | null {
  if (best == null || worst == null) return null;
  return worst - best;
}

export function mergeData(input: RawPlayer[]): PlayerData[] {
  const seen = new Set<string>();
  const result: PlayerData[] = [];

  for (const p of input) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);

    const sources = [
      p.adp.sleeper,
      p.adp.mfl,
      p.adp.espn,
    ].filter((v): v is number => v != null);

    const best = computeBest(sources);
    const worst = computeWorst(sources);

    result.push({
      id: p.id,
      name: p.name,
      position: p.position as PlayerData['position'],
      team: p.team,
      adp: {
        sleeper: p.adp.sleeper ?? null,
        mfl: p.adp.mfl ?? null,
        espn: p.adp.espn ?? null,
      },
      medianAdp: computeMedian(sources),
      bestAdp: best,
      worstAdp: worst,
      adpSpread: computeSpread(best, worst),
    });
  }

  return result;
}
