import { useEffect } from 'react';
import { PlayerData, SourceInfo } from '../types';
import AdpChart from './AdpChart';

interface PlayerModalProps {
  player: PlayerData;
  sources: SourceInfo[];
  onClose: () => void;
}

const SOURCE_LABELS: Record<string, string> = {
  sleeper: 'Sleeper',
  mfl: 'MFL',
  espn: 'ESPN',
};

const SOURCE_COLORS: Record<string, string> = {
  sleeper: '#3B82F6',
  mfl: '#10B981',
  espn: '#F59E0B',
};

function formatAdp(adp: number | null): string {
  if (adp == null) return '—';
  return adp.toFixed(1);
}

export default function PlayerModal({ player, sources, onClose }: PlayerModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const activeSources = sources.filter(s => s.active);
  const chartData: { [key: string]: number } = {};
  if (player.adp.sleeper != null) chartData.sleeper = player.adp.sleeper;
  if (player.adp.mfl != null) chartData.mfl = player.adp.mfl;
  if (player.adp.espn != null) chartData.espn = player.adp.espn;

  const adpValues = [
    { label: 'Median', value: player.medianAdp, color: '#0F172A', bold: true },
    ...activeSources.map(s => ({
      label: SOURCE_LABELS[s.name] || s.label,
      value: player.adp[s.name],
      color: SOURCE_COLORS[s.name],
      bold: false,
    })),
    { label: 'Best', value: player.bestAdp, color: '#10B981', bold: true },
    { label: 'Worst', value: player.worstAdp, color: '#EF4444', bold: true },
    { label: 'Spread', value: player.adpSpread, color: '#64748B', bold: true },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />
      <div
        className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-modal-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <span className={`pos-badge`}>
              {player.position}
            </span>
            <div>
              <h2 className="text-lg font-bold text-navy dark:text-gray-100 leading-tight">{player.name}</h2>
              <p className="text-sm text-slate-light dark:text-slate-400 font-medium">{player.team}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-light dark:text-slate-400 hover:text-navy dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-smooth"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {adpValues.map(item => (
              <div key={item.label} className="flex flex-col items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-700 py-2.5 px-2">
                <span className="text-xs font-medium text-slate-light dark:text-slate-400 mb-0.5">{item.label}</span>
                <span className={`font-mono text-sm font-semibold ${item.bold ? 'text-navy dark:text-gray-100' : ''}`} style={{ color:	item.bold ? undefined : item.color }}>
                  {formatAdp(item.value)}
                </span>
              </div>
            ))}
          </div>

          <AdpChart sources={chartData} />
        </div>
      </div>
    </div>
  );
}
