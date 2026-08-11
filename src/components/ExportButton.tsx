import { exportPlayersToCsv } from '../utils/exportCsv';
import { PlayerData } from '../types';

interface ExportButtonProps {
  players: PlayerData[];
}

export default function ExportButton({ players }: ExportButtonProps) {
  const handleExport = () => {
    exportPlayersToCsv(players);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-slate dark:text-slate-400 hover:text-navy dark:hover:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700 transition-smooth"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export CSV
    </button>
  );
}
