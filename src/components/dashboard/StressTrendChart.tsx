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

const trendData = {
  general: [
    { month: "Ene", value: 62 },
    { month: "Feb", value: 58 },
    { month: "Mar", value: 65 },
    { month: "Abr", value: 70 },
    { month: "May", value: 68 },
    { month: "Jun", value: 72 },
    { month: "Jul", value: 68 },
  ],
  Marketing: [
    { month: "Ene", value: 68 },
    { month: "Feb", value: 65 },
    { month: "Mar", value: 70 },
    { month: "Abr", value: 75 },
    { month: "May", value: 72 },
    { month: "Jun", value: 78 },
    { month: "Jul", value: 72 },
  ],
  "Recursos Humanos": [
    { month: "Ene", value: 50 },
    { month: "Feb", value: 48 },
    { month: "Mar", value: 52 },
    { month: "Abr", value: 55 },
    { month: "May", value: 54 },
    { month: "Jun", value: 58 },
    { month: "Jul", value: 54 },
  ],
  Operación: [
    { month: "Ene", value: 72 },
    { month: "Feb", value: 68 },
    { month: "Mar", value: 75 },
    { month: "Abr", value: 80 },
    { month: "May", value: 78 },
    { month: "Jun", value: 82 },
    { month: "Jul", value: 78 },
  ],
  Ventas: [
    { month: "Ene", value: 58 },
    { month: "Feb", value: 55 },
    { month: "Mar", value: 62 },
    { month: "Abr", value: 68 },
    { month: "May", value: 65 },
    { month: "Jun", value: 70 },
    { month: "Jul", value: 65 },
  ],
};

type AreaKey = keyof typeof trendData;

const areas: { key: AreaKey; label: string }[] = [
  { key: "general", label: "General" },
  { key: "Marketing", label: "Marketing" },
  { key: "Recursos Humanos", label: "RR.HH." },
  { key: "Operación", label: "Operación" },
  { key: "Ventas", label: "Ventas" },
];

const StressTrendChart = () => {
  const [selectedArea, setSelectedArea] = useState<AreaKey>("general");

  const data = trendData[selectedArea];

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Tendencia de estrés
          </h3>
          <p className="text-sm text-muted-foreground">
            {selectedArea === "general"
              ? "Nivel de estrés general de la empresa"
              : `Nivel de estrés del área de ${selectedArea}`}
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

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
              formatter={(value: number) => [`${value}%`, "Estrés"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{
                fill: "hsl(var(--primary))",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                fill: "hsl(var(--primary))",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StressTrendChart;
