import { PlayerData } from '../types';

export function exportPlayersToCsv(players: PlayerData[], filename: string = 'adp-data.csv'): void {
  const headers = ['Name', 'ID', 'Position', 'Team', 'Sleeper ADP', 'MFL ADP', 'ESPN ADP'];
  const rows = players.map(p => [
    p.name,
    p.id,
    p.position,
    p.team,
    p.adp.sleeper ?? '',
    p.adp.mfl ?? '',
    p.adp.espn ?? '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
