import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCRIPTS = [
  'fetch-sleeper.js',
  'fetch-mfl.js',
  'fetch-espn.js',
  'merge-data.js',
];

async function main() {
  console.log('=== Starting ADP data fetch ===\n');

  for (const script of SCRIPTS) {
    console.log(`> Running ${script}...`);
    try {
      const scriptPath = path.join(__dirname, script);
      execSync(`node "${scriptPath}"`, { stdio: 'inherit', timeout: 30000 });
      console.log(`\u2713 ${script} completed\n`);
    } catch (err) {
      console.error(`\u2717 ${script} failed: ${err.message}\n`);
    }
  }

  console.log('=== All scripts complete ===');
}

main().catch(err => { console.error('[fetch-all] Error:', err.message); process.exit(1); });
