import { PlayerData, SourceName } from '../types';
import { computeMedian, computeBest, computeWorst, computeSpread } from './normalize';

export function computeDynamicAdp(
  player: PlayerData,
  activeSources: SourceName[],
): PlayerData {
  const values: number[] = [];
  for (const source of activeSources) {
    const val = player.adp[source];
    if (val != null) values.push(val);
  }

  const median = computeMedian(values);
  const best = computeBest(values);
  const worst = computeWorst(values);
  const spread = computeSpread(best, worst);

  return {
    ...player,
    medianAdp: median,
    bestAdp: best,
    worstAdp: worst,
    adpSpread: spread,
  };
}

export function computeDynamicAdpForAll(
  players: PlayerData[],
  activeSources: SourceName[],
): PlayerData[] {
  return players.map(p => computeDynamicAdp(p, activeSources));
}
