import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../src/data');
const SOURCES = ['sleeper', 'mfl', 'espn'];

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function loadSource(name) {
  const filePath = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`[merge] ${name}.json not found, skipping`);
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function canonicalKey(player) {
  const name = (player.name || '').toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]/g, ' ').trim();
  const position = (player.position || '').toUpperCase();
  return `${name}|${position}`;
}

function main() {
  const sourceData = {};
  for (const src of SOURCES) {
    sourceData[src] = loadSource(src);
  }

  const playerMap = new Map();

  for (const src of SOURCES) {
    if (!sourceData[src]) continue;
    for (const entry of sourceData[src]) {
      const key = canonicalKey(entry);
      if (!playerMap.has(key)) {
        playerMap.set(key, {
          id: entry.id,
          name: entry.name,
          position: entry.position,
          team: entry.team,
          adp: {},
        });
      }
      const merged = playerMap.get(key);
      merged.adp[src] = entry.adp;
    }
  }

  const players = [];
  for (const player of playerMap.values()) {
    const values = SOURCES.map(s => player.adp[s]).filter(v => v != null);

    players.push({
      id: player.id,
      name: player.name,
      position: player.position,
      team: player.team,
      adp: {
        sleeper: player.adp.sleeper ?? null,
        mfl: player.adp.mfl ?? null,
        espn: player.adp.espn ?? null,
      },
      medianAdp: values.length >= 2 ? median(values) : null,
      bestAdp: values.length >= 1 ? Math.min(...values) : null,
      worstAdp: values.length >= 1 ? Math.max(...values) : null,
      adpSpread: values.length >= 2 ? Math.max(...values) - Math.min(...values) : null,
    });
  }

  players.sort((a, b) => (a.medianAdp ?? 999) - (b.medianAdp ?? 999));

  const output = {
    lastUpdated: new Date().toISOString(),
    players,
  };

  const OUT = path.join(DATA_DIR, 'merged.json');
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(output, null, 2));

  const sourcesCount = SOURCES.filter(s => sourceData[s] !== null).length;
  console.log(`[merge] Merged ${players.length} players from ${sourcesCount} sources into merged.json`);
}

try { main(); } catch (err) { console.error('[merge] Error:', err.message); process.exit(1); }
