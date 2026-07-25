import { describe, it, expect } from 'vitest';
import { computeMedian, computeBest, computeWorst, computeSpread, mergeData } from '../utils/normalize';

describe('computeMedian', () => {
  it('computes median of odd-length array', () => {
    expect(computeMedian([10, 20, 30])).toBe(20);
  });

  it('computes median of even-length array', () => {
    expect(computeMedian([10, 20, 30, 40])).toBe(25);
  });

  it('returns null for empty array', () => {
    expect(computeMedian([])).toBeNull();
  });

  it('handles single element', () => {
    expect(computeMedian([42])).toBe(42);
  });
});

describe('computeBest', () => {
  it('returns minimum value', () => {
    expect(computeBest([10, 5, 20, 15])).toBe(5);
  });

  it('returns null for empty array', () => {
    expect(computeBest([])).toBeNull();
  });
});

describe('computeWorst', () => {
  it('returns maximum value', () => {
    expect(computeWorst([10, 5, 20, 15])).toBe(20);
  });

  it('returns null for empty array', () => {
    expect(computeWorst([])).toBeNull();
  });
});

describe('computeSpread', () => {
  it('computes spread correctly', () => {
    expect(computeSpread(5, 20)).toBe(15);
  });

  it('returns null when best is null', () => {
    expect(computeSpread(null, 20)).toBeNull();
  });

  it('returns null when worst is null', () => {
    expect(computeSpread(5, null)).toBeNull();
  });
});

describe('mergeData', () => {
  it('merges players with multiple sources', () => {
    const input = [
      {
        id: 'qb_josh_allen',
        name: 'Josh Allen',
        position: 'QB',
        team: 'BUF',
        adp: { sleeper: 7, mfl: 9, espn: 8 },
      },
    ];
    const result = mergeData(input);
    expect(result).toHaveLength(1);
    expect(result[0].medianAdp).toBe(8);
    expect(result[0].bestAdp).toBe(7);
    expect(result[0].worstAdp).toBe(9);
    expect(result[0].adpSpread).toBe(2);
  });

  it('handles null ADP values', () => {
    const input = [
      {
        id: 'qb_josh_allen',
        name: 'Josh Allen',
        position: 'QB',
        team: 'BUF',
        adp: { sleeper: 7, mfl: null, espn: 8 },
      },
    ];
    const result = mergeData(input);
    expect(result[0].medianAdp).toBe(7.5);
    expect(result[0].bestAdp).toBe(7);
    expect(result[0].worstAdp).toBe(8);
  });

  it('deduplicates players by ID', () => {
    const input = [
      {
        id: 'qb_josh_allen',
        name: 'Josh Allen',
        position: 'QB',
        team: 'BUF',
        adp: { sleeper: 7 },
      },
      {
        id: 'qb_josh_allen',
        name: 'Josh Allen',
        position: 'QB',
        team: 'BUF',
        adp: { mfl: 9 },
      },
    ];
    const result = mergeData(input);
    expect(result).toHaveLength(1);
  });
});
