import { PlayerData, SourceInfo } from '../types';

interface PlayerRowProps {
  player: PlayerData;
  rank: number;
  sources: SourceInfo[];
  minSources: number;
  onClick: () => void;
}

function getAdpCellClass(adp: number | null): string {
  if (adp == null) {
    return 'text-gray-300';
  }
  if (adp <= 5) {
    return 'text-emerald-600';
  }
  if (adp <= 15) {
    return 'text-emerald-600/80';
  }
  if (adp <= 30) {
    return 'text-amber-600/80';
  }
  return 'text-red-500/70';
}

function formatAdp(adp: number | null): string {
  if (adp == null) return '—';
  return adp.toFixed(1);
}

export default function PlayerRow({ player, rank, sources, minSources, onClick }: PlayerRowProps) {
  const activeSources = sources.filter(s => s.active);

  const adpCount = [
    player.adp.sleeper,
    player.adp.mfl,
    player.adp.espn,
    player.adp.fantasypros,
  ].filter((v): v is number => v != null).length;

  if (adpCount < minSources) {
    return null;
  }

  const isEven = rank % 2 === 0;

  return (
    <tr
      className={`tr-hover cursor-pointer transition-colors ${isEven ? 'bg-gray-50/50' : 'bg-white'}`}
      onClick={onClick}
    >
      <td className={`sticky left-0 z-10 py-3 px-3 font-mono text-xs font-medium text-slate text-center w-10 ${isEven ? 'bg-gray-50/50' : 'bg-white'}`}>
        {rank}
      </td>
      <td className={`sticky left-10 z-10 py-3 pl-1 pr-3 align-middle ${isEven ? 'bg-gray-50/50' : 'bg-white'}`}>
        <div className="flex items-center gap-2 min-w-0">
          <span className={`pos-badge hidden sm:inline-flex shrink-0`}>
            {player.position}
          </span>
          <div className="min-w-0">
            <span className="text-sm font-semibold text-navy truncate block">{player.name}</span>
            <span className="text-xs font-medium text-slate-light">{player.team}</span>
          </div>
        </div>
      </td>
      <td className={`py-3 px-2 text-center sm:hidden ${isEven ? 'bg-gray-50/50' : 'bg-white'}`}>
        <span className={`pos-badge`}>{player.position}</span>
      </td>
      {activeSources.map(source => (
        <td key={source.name} className="py-3 px-2">
          <span className={`font-mono text-xs tabular-nums ${getAdpCellClass(player.adp[source.name])}`}>
            {formatAdp(player.adp[source.name])}
          </span>
        </td>
      ))}
      <td className="py-3 px-2">
        <span className={`font-mono text-xs tabular-nums text-right font-semibold ${getAdpCellClass(player.medianAdp)}`}>
          {formatAdp(player.medianAdp)}
        </span>
      </td>
      <td className="py-3 px-2">
        <span className={`font-mono text-xs tabular-nums text-right ${getAdpCellClass(player.bestAdp)}`}>
          {formatAdp(player.bestAdp)}
        </span>
      </td>
      <td className="py-3 px-2">
        <span className={`font-mono text-xs tabular-nums text-right ${getAdpCellClass(player.worstAdp)}`}>
          {formatAdp(player.worstAdp)}
        </span>
      </td>
      <td className="py-3 px-2">
        <span className="font-mono text-xs tabular-nums text-right font-semibold text-slate">
          {formatAdp(player.adpSpread)}
        </span>
      </td>
    </tr>
  );
}
