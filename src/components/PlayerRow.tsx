import { PlayerData, SourceInfo } from '../types';

interface PlayerRowProps {
  player: PlayerData;
  rank: number;
  sources: SourceInfo[];
  minSources: number;
}

function getAdpCellClass(adp: number | null): string {
  if (adp == null) {
    return 'text-gray-300';
  }
  if (adp <= 5) {
    return 'text-green-700 bg-green-50';
  }
  if (adp <= 15) {
    return 'text-emerald-700 bg-emerald-50';
  }
  if (adp <= 30) {
    return 'text-yellow-700 bg-yellow-50';
  }
  return 'text-red-600 bg-red-50';
}

function formatAdp(adp: number | null): string {
  if (adp == null) return '\u2014';
  return adp.toFixed(1);
}

export default function PlayerRow({ player, rank, sources, minSources }: PlayerRowProps) {
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

  return (
    <tr className="tr-hover transition-smooth">
      <td className="sticky left-0 z-10 bg-surface py-2.5 pr-3 font-mono text-sm font-medium text-slate md:sticky">
        {rank}
      </td>
      <td className="sticky left-12 z-10 bg-surface py-2.5 pl-1 pr-3 align-middle md:sticky md:left-20">
        <div className="flex items-center gap-2">
          <span className={`pos-badge hidden sm:inline-flex`}>
            {player.position}
          </span>
          <div>
            <span className="font-semibold text-navy">{player.name}</span>
            <span className="ml-1.5 text-xs text-slate">{player.team}</span>
          </div>
        </div>
      </td>
      <td className="sticky left-48 z-10 bg-surface py-2.5 pr-3 sm:hidden md:sticky md:left-52">
        <span className={`pos-badge`}>{player.position}</span>
      </td>
      {activeSources.map(source => (
        <td key={source.name} className="py-2.5">
          <span className={`inline-block w-full rounded px-2 py-0.5 font-mono text-sm text-right num-cell ${getAdpCellClass(player.adp[source.name])}`}>
            {formatAdp(player.adp[source.name])}
          </span>
        </td>
      ))}
      <td className="py-2.5">
        <span className={`inline-block w-full rounded px-2 py-0.5 font-mono text-sm text-right num-cell ${getAdpCellClass(player.medianAdp)}`}>
          {formatAdp(player.medianAdp)}
        </span>
      </td>
      <td className="py-2.5">
        <span className={`inline-block w-full rounded px-2 py-0.5 font-mono text-sm text-right num-cell ${getAdpCellClass(player.bestAdp)}`}>
          {formatAdp(player.bestAdp)}
        </span>
      </td>
      <td className="py-2.5">
        <span className={`inline-block w-full rounded px-2 py-0.5 font-mono text-sm text-right num-cell ${getAdpCellClass(player.worstAdp)}`}>
          {formatAdp(player.worstAdp)}
        </span>
      </td>
      <td className="py-2.5">
        <span className="inline-block w-full rounded px-2 py-0.5 font-mono text-sm text-right font-semibold text-slate num-cell">
          {formatAdp(player.adpSpread)}
        </span>
      </td>
    </tr>
  );
}
