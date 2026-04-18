import { WeightLog } from '../types';

interface WeightChartProps {
  logs: WeightLog[];
  targetWeight: number;
}

export default function WeightChart({ logs, targetWeight }: WeightChartProps) {
  if (logs.length < 2) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl h-48 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Log at least 2 entries to see your chart</p>
      </div>
    );
  }

  const sorted = [...logs].sort((a, b) => a.logged_date.localeCompare(b.logged_date));
  const weights = sorted.map((l) => l.weight_kg);
  const allValues = [...weights, targetWeight].filter(Boolean);

  const minVal = Math.floor(Math.min(...allValues) - 1);
  const maxVal = Math.ceil(Math.max(...allValues) + 1);
  const range = maxVal - minVal || 1;

  const svgWidth = 500;
  const svgHeight = 200;
  const paddingLeft = 48;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 32;
  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const xStep = chartWidth / Math.max(sorted.length - 1, 1);

  function toX(idx: number) {
    return paddingLeft + idx * xStep;
  }

  function toY(val: number) {
    return paddingTop + chartHeight - ((val - minVal) / range) * chartHeight;
  }

  const linePath = sorted
    .map((log, idx) => `${idx === 0 ? 'M' : 'L'} ${toX(idx)} ${toY(log.weight_kg)}`)
    .join(' ');

  const areaPath =
    `${linePath} L ${toX(sorted.length - 1)} ${paddingTop + chartHeight} L ${toX(0)} ${paddingTop + chartHeight} Z`;

  const targetY = toY(targetWeight);

  const yTicks = Array.from({ length: 5 }, (_, i) => minVal + (range / 4) * i);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full"
        style={{ minWidth: '300px' }}
      >
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={paddingLeft}
              x2={svgWidth - paddingRight}
              y1={toY(tick)}
              y2={toY(tick)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={paddingLeft - 6}
              y={toY(tick) + 4}
              textAnchor="end"
              fontSize="10"
              fill="#9ca3af"
            >
              {tick.toFixed(1)}
            </text>
          </g>
        ))}

        {targetWeight > 0 && (
          <>
            <line
              x1={paddingLeft}
              x2={svgWidth - paddingRight}
              y1={targetY}
              y2={targetY}
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            <text
              x={svgWidth - paddingRight - 2}
              y={targetY - 4}
              textAnchor="end"
              fontSize="10"
              fill="#10b981"
              fontWeight="600"
            >
              Target {targetWeight}kg
            </text>
          </>
        )}

        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={linePath} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {sorted.map((log, idx) => (
          <g key={log.id}>
            <circle cx={toX(idx)} cy={toY(log.weight_kg)} r="5" fill="#f97316" stroke="white" strokeWidth="2" />
            {sorted.length <= 10 && (
              <text
                x={toX(idx)}
                y={paddingTop + chartHeight + 20}
                textAnchor="middle"
                fontSize="9"
                fill="#6b7280"
              >
                {formatDate(log.logged_date)}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
