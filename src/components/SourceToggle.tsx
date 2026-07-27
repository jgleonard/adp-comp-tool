import { useCallback } from 'react';
import { SourceInfo, SourceName } from '../types';

interface SourceToggleProps {
  sources: SourceInfo[];
  onToggle: (name: SourceName) => void;
}

export default function SourceToggle({ sources, onToggle }: SourceToggleProps) {
  const handleClick = useCallback(
    (name: SourceName) => {
      onToggle(name);
    },
    [onToggle],
  );

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs font-medium text-slate-light dark:text-slate-400 mr-1">Sources:</span>
      {sources.map(source => (
        <button
          key={source.name}
          type="button"
          onClick={() => handleClick(source.name)}
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-smooth ${
            source.active
              ? 'text-white shadow-sm'
              : 'border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-light dark:text-slate-400 hover:border-gray-300 dark:hover:border-gray-500 hover:text-slate dark:hover:text-gray-200'
          }`}
          style={
            source.active
              ? { backgroundColor: source.color }
              : undefined
          }
        >
          {source.label}
        </button>
      ))}
    </div>
  );
}
