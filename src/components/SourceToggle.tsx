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
    <div className="flex flex-wrap gap-3">
      {sources.map(source => (
        <button
          key={source.name}
          type="button"
          onClick={() => handleClick(source.name)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth ${
            source.active
              ? 'text-white shadow-sm'
              : 'bg-gray-100 text-slate hover:bg-gray-200'
          }`}
          style={
            source.active
              ? { backgroundColor: source.color }
              : undefined
          }
        >
          {/* Toggle indicator */}
          <span
            className={`inline-block h-4 w-4 rounded-full border-2 transition-smooth ${
              source.active
                ? 'border-white bg-white'
                : 'border-slate-light bg-transparent'
            }`}
          />
          {source.label}
        </button>
      ))}
    </div>
  );
}
