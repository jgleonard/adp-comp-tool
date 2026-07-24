import { describe, it, expect } from 'vitest';
import { computeDynamicAdp, computeDynamicAdpForAll } from '../utils/dynamicAdp';
import { PlayerData } from '../types';

const makePlayer = (adp: Partial<PlayerData['adp']> = {}): PlayerData => ({
  id: 'test',
  name: 'Test Player',
  position: 'WR',
  team: 'MIA',
  adp: {
    sleeper: null,
    mfl: null,
    espn: null,
    fantasypros: null,
    ...adp,
  },
  medianAdp: null,
  bestAdp: null,
  worstAdp: null,
  adpSpread: null,
});

describe('computeDynamicAdp', () => {
  it('recomputes median based on active sources only', () => {
    const player = makePlayer({ sleeper: 10, mfl: 20, espn: 30, fantasypros: 40 });
    // Only sleeper and mfl active → median of [10, 20] = 15
    const result = computeDynamicAdp(player, ['sleeper', 'mfl']);
    expect(result.medianAdp).toBe(15);
    expect(result.bestAdp).toBe(10);
    expect(result.worstAdp).toBe(20);
    expect(result.adpSpread).toBe(10);
  });

  it('excludes null values from active sources', () => {
    const player = makePlayer({ sleeper: 10, mfl: null, espn: 30 });
    // sleeper=10, mfl=null → only [10] counts
    const result = computeDynamicAdp(player, ['sleeper', 'mfl']);
    expect(result.medianAdp).toBe(10);
    expect(result.bestAdp).toBe(10);
    expect(result.worstAdp).toBe(10);
    expect(result.adpSpread).toBe(0);
  });

  it('returns null aggregates when no active source has data', () => {
    const player = makePlayer({ sleeper: 10, mfl: null });
    // Only mfl active, but mfl is null
    const result = computeDynamicAdp(player, ['mfl']);
    expect(result.medianAdp).toBeNull();
    expect(result.bestAdp).toBeNull();
    expect(result.worstAdp).toBeNull();
    expect(result.adpSpread).toBeNull();
  });

  it('includes all sources when all are active', () => {
    const player = makePlayer({ sleeper: 5, mfl: 15, espn: 10, fantasypros: 20 });
    const result = computeDynamicAdp(player, ['sleeper', 'mfl', 'espn', 'fantasypros']);
    // sorted: [5, 10, 15, 20] → median = (10+15)/2 = 12.5
    expect(result.medianAdp).toBe(12.5);
    expect(result.bestAdp).toBe(5);
    expect(result.worstAdp).toBe(20);
    expect(result.adpSpread).toBe(15);
  });

  it('preserves original player fields', () => {
    const player = makePlayer({ sleeper: 10 });
    const result = computeDynamicAdp(player, ['sleeper']);
    expect(result.name).toBe('Test Player');
    expect(result.position).toBe('WR');
    expect(result.adp.sleeper).toBe(10);
  });
});

describe('computeDynamicAdpForAll', () => {
  it('transforms all players', () => {
    const players = [
      makePlayer({ sleeper: 10, mfl: 20 }),
      makePlayer({ sleeper: 5, mfl: null }),
    ];
    const result = computeDynamicAdpForAll(players, ['sleeper', 'mfl']);
    expect(result).toHaveLength(2);
    expect(result[0].medianAdp).toBe(15);
    expect(result[1].medianAdp).toBe(5);
  });
});
