import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../src/data');

const ESPN_BASE = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl';

const POSITION_MAP = {
  1: 'QB',
  2: 'RB',
  3: 'WR',
  4: 'TE',
  5: 'K',
  16: 'DEF',
};

const TEAM_MAP = {
  0: null,
  1: 'ATL',
  2: 'BUF',
  3: 'CHI',
  4: 'CIN',
  5: 'CLE',
  6: 'DAL',
  7: 'MIA',
  8: 'DET',
  9: 'GB',
  10: 'NYG',
  11: 'IND',
  12: 'KC',
  13: 'LV',
  14: 'LAR',
  15: 'MIA',
  16: 'MIN',
  17: 'NE',
  18: 'JAX',
  19: 'NYJ',
  20: 'NYJ',
  21: 'PHI',
  22: 'ARI',
  23: 'SEA',
  24: 'LAC',
  25: 'SF',
  26: 'HOU',
  27: 'TB',
  28: 'WAS',
  29: 'CAR',
  30: 'JAX',
  33: 'BAL',
  34: 'HOU',
  35: 'PIT',
  36: 'TEN',
};

function generateId(name, position) {
  const posShort = position === 'DEF' ? 'def' : position.toLowerCase();
  const slug = name
    .replace(/['']/g, '')
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase()
    .replace(/^_|_$/g, '');
  return `${posShort}_${slug}`;
}

function normalize(name) {
  return name
    .toLowerCase()
    .replace(/[''.]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchEspnRankings(year) {
  console.log(`[espn] Fetching from ESPN API (year ${year})...`);

  const url = `${ESPN_BASE}/seasons/${year}/segments/0/leaguedefaults/3?view=kona_player_info`;

  const filter = JSON.stringify({
    players: {
      limit: 500,
      sortDraftRanks: {
        sortPriority: 1,
        sortAsc: true,
        value: 'STANDARD',
      },
    },
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const resp = await fetch(url, {
      headers: { 'x-fantasy-filter': filter },
      signal: controller.signal,
    });

    if (!resp.ok) {
      throw new Error(`ESPN API returned ${resp.status} ${resp.statusText}`);
    }

    const json = await resp.json();

    if (!json.players || !Array.isArray(json.players)) {
      throw new Error('Invalid ESPN API response: missing players array');
    }

    console.log(`[espn] ESPN returned ${json.players.length} players`);

    const players = [];
    const seen = new Set();

    for (const entry of json.players) {
      const player = entry.player;
      if (!player || !player.fullName) continue;

      const standard = player.draftRanksByRankType?.STANDARD;
      if (!standard || !standard.rank) continue;

      const key = normalize(player.fullName);
      if (seen.has(key)) continue;
      seen.add(key);

      const position = POSITION_MAP[player.defaultPositionId];
      if (!position) continue;

      const team = TEAM_MAP[player.proTeamId] ?? null;

      players.push({
        id: generateId(player.fullName, position),
        name: player.fullName,
        position,
        team,
        adp: standard.rank,
      });
    }

    players.sort((a, b) => a.adp - b.adp);
    console.log(`[espn] Processed ${players.length} players with STANDARD rankings`);

    if (players.length === 0) {
      throw new Error('No players with draft rankings found — rankings may not be available yet');
    }

    return players;
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const OUT = path.join(DATA_DIR, 'espn.json');
  fs.mkdirSync(DATA_DIR, { recursive: true });

  let espnData;
  try {
    espnData = await fetchEspnRankings(2026);
    console.log('[espn] Using 2026 ESPN rankings');
  } catch (e) {
    console.log(`[espn] 2026 unavailable (${e.message}), trying 2025...`);
    try {
      espnData = await fetchEspnRankings(2025);
      console.log('[espn] Using 2025 ESPN rankings as fallback');
    } catch (e2) {
      console.error('[espn] Both 2026 and 2025 failed:', e2.message);
      process.exit(1);
    }
  }

  fs.writeFileSync(OUT, JSON.stringify(espnData, null, 2));
  console.log(`[espn] Wrote ${espnData.length} players to espn.json`);
}

main().catch((err) => {
  console.error('[espn] Error:', err.message);
  process.exit(1);
});
