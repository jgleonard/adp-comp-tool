import { describe, it, expect } from 'vitest';
import { sortPlayers } from '../utils/sorting';
import { PlayerData } from '../types';

const mockPlayers: PlayerData[] = [
  {
    id: 'qb_josh_allen',
    name: 'Josh Allen',
    position: 'QB',
    team: 'BUF',
    adp: { sleeper: 7, mfl: 9, espn: 8, fantasypros: 10 },
    medianAdp: 8,
    bestAdp: 7,
    worstAdp: 10,
    adpSpread: 3,
  },
  {
    id: 'rb_christian_mccaffrey',
    name: 'Christian McCaffrey',
    position: 'RB',
    team: 'SF',
    adp: { sleeper: 2, mfl: 3, espn: 1, fantasypros: 4 },
    medianAdp: 2.5,
    bestAdp: 1,
    worstAdp: 4,
    adpSpread: 3,
  },
  {
    id: 'wr_justin_jefferson',
    name: 'Justin Jefferson',
    position: 'WR',
    team: 'MIN',
    adp: { sleeper: 3, mfl: null, espn: 4, fantasypros: null },
    medianAdp: 3.5,
    bestAdp: 3,
    worstAdp: 4,
    adpSpread: 1,
  },
];

describe('sortPlayers', () => {
  it('sorts by name alphabetically', () => {
    const result = sortPlayers(mockPlayers, 'name', 'asc');
    expect(result[0].name).toBe('Christian McCaffrey');
    expect(result[1].name).toBe('Josh Allen');
    expect(result[2].name).toBe('Justin Jefferson');
  });

  it('sorts by name reverse alphabetically', () => {
    const result = sortPlayers(mockPlayers, 'name', 'desc');
    expect(result[0].name).toBe('Justin Jefferson');
    expect(result[1].name).toBe('Josh Allen');
    expect(result[2].name).toBe('Christian McCaffrey');
  });

  it('sorts by median ADP ascending', () => {
    const result = sortPlayers(mockPlayers, 'medianAdp', 'asc');
    expect(result[0].name).toBe('Christian McCaffrey');
    expect(result[1].name).toBe('Justin Jefferson');
    expect(result[2].name).toBe('Josh Allen');
  });

  it('sorts by median ADP descending', () => {
    const result = sortPlayers(mockPlayers, 'medianAdp', 'desc');
    expect(result[0].name).toBe('Josh Allen');
    expect(result[1].name).toBe('Justin Jefferson');
    expect(result[2].name).toBe('Christian McCaffrey');
  });

  it('sorts by position', () => {
    const result = sortPlayers(mockPlayers, 'position', 'asc');
    expect(result[0].position).toBe('QB');
    expect(result[1].position).toBe('RB');
    expect(result[2].position).toBe('WR');
  });

  it('sorts by team', () => {
    const result = sortPlayers(mockPlayers, 'team', 'asc');
    expect(result[0].team).toBe('BUF');
    expect(result[1].team).toBe('MIN');
    expect(result[2].team).toBe('SF');
  });

  it('puts null values at the end regardless of direction', () => {
    const resultAsc = sortPlayers(mockPlayers, 'fantasypros', 'asc');
    const resultDesc = sortPlayers(mockPlayers, 'fantasypros', 'desc');
    expect(resultAsc[2].name).toBe('Justin Jefferson');
    expect(resultDesc[2].name).toBe('Justin Jefferson');
  });

  it('sorts by source ADP', () => {
    const result = sortPlayers(mockPlayers, 'sleeper', 'asc');
    expect(result[0].adp.sleeper).toBe(2);
    expect(result[1].adp.sleeper).toBe(3);
    expect(result[2].adp.sleeper).toBe(7);
  });

  it('sorts by best ADP', () => {
    const result = sortPlayers(mockPlayers, 'bestAdp', 'asc');
    expect(result[0].name).toBe('Christian McCaffrey');
    expect(result[1].name).toBe('Justin Jefferson');
    expect(result[2].name).toBe('Josh Allen');
  });

  it('sorts by ADP spread', () => {
    const result = sortPlayers(mockPlayers, 'adpSpread', 'asc');
    expect(result[0].name).toBe('Justin Jefferson');
    expect(result[1].adpSpread).toBe(3);
    expect(result[2].adpSpread).toBe(3);
  });
});
