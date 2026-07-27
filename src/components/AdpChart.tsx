import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '../context/ThemeContext';

interface AdpChartProps {
  sources: { [key: string]: number };
}

const SOURCE_COLORS: Record<string, string> = {
  sleeper: '#3B82F6',
  mfl: '#10B981',
  espn: '#F59E0B',
};

const SOURCE_LABELS: Record<string, string> = {
  sleeper: 'Sleeper',
  mfl: 'MFL',
  espn: 'ESPN',
};

export default function AdpChart({ sources }: AdpChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridColor = isDark ? '#374151' : '#F1F5F9';
  const tickColor = isDark ? '#6B7280' : '#94A3B8';
  const tickColorLight = isDark ? '#4B5563' : '#CBD5E1';

  const data = Object.entries(sources)
    .filter(([, value]) => value != null)
    .map(([source, value]) => ({
      source: SOURCE_LABELS[source] || source,
      sourceKey: source,
      adp: value,
    }));

  const maxAdp = Math.max(...data.map(d => d.adp), 1);

  return (
    <div>
      <div className="h-52 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="source"
              tick={{ fontSize: 11, fill: tickColor, fontWeight: 500 }}
              axisLine={{ stroke: gridColor }}
              tickLine={{ stroke: gridColor }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: tickColorLight }}
              axisLine={{ stroke: gridColor }}
              tickLine={{ stroke: gridColor }}
              domain={[0, Math.ceil(maxAdp * 1.1)]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const entry = payload[0]?.payload;
                if (!entry) return null;
                const { source, adp } = entry;
                return (
                  <div className="rounded-lg bg-navy dark:bg-gray-700 px-3 py-2 shadow-lg">
                    <p className="text-xs font-semibold text-white dark:text-gray-100">{source}</p>
                    <p className="text-xs text-slate-light dark:text-slate-300">ADP <span className="text-teal font-mono font-semibold">{adp.toFixed(1)}</span></p>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="adp"
              maxBarSize={56}
              radius={[6, 6, 0, 0]}
              animationDuration={400}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={SOURCE_COLORS[entry.sourceKey] || '#94a3b8'}
                  className="transition-smooth"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        {data.map(({ source, sourceKey, adp }) => (
          <div key={sourceKey} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: SOURCE_COLORS[sourceKey] }} />
            <span className="text-xs text-slate-light dark:text-slate-400">{source}</span>
            <span className="font-mono text-xs font-semibold text-navy dark:text-gray-200">{adp.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
