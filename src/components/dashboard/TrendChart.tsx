import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendChartProps {
  title: string;
  metricLabel: string;
  color: string;
  data: Record<string, { month: string; value: number }[]>;
}

type AreaKey = "general" | "Marketing" | "Recursos Humanos" | "Operación" | "Ventas";

const areas: { key: AreaKey; label: string }[] = [
  { key: "general", label: "General" },
  { key: "Marketing", label: "Marketing" },
  { key: "Recursos Humanos", label: "RR.HH." },
  { key: "Operación", label: "Operación" },
  { key: "Ventas", label: "Ventas" },
];

const TrendChart = ({ title, metricLabel, color, data }: TrendChartProps) => {
  const [selectedArea, setSelectedArea] = useState<AreaKey>("general");

  const chartData = data[selectedArea];

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {selectedArea === "general"
              ? `Nivel de ${metricLabel.toLowerCase()} general de la empresa`
              : `Nivel de ${metricLabel.toLowerCase()} del área de ${selectedArea}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {areas.map((area) => (
            <button
              key={area.key}
              onClick={() => setSelectedArea(area.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedArea === area.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {area.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              domain={[0, 100]}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [`${value}%`, metricLabel]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={{
                fill: color,
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                fill: color,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;