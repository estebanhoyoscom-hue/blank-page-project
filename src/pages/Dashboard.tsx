import KpiCard from "@/components/dashboard/KpiCard";
import PuzzleAreaCards from "@/components/dashboard/PuzzleAreaCards";
import TrendChart from "@/components/dashboard/TrendChart";
import BehumanLogo from "@/components/BehumanLogo";

const areasData = [
  { name: "Marketing", data: { stress: 72, emotion: 39, anxiety: 61 } },
  { name: "Recursos Humanos", data: { stress: 54, emotion: 71, anxiety: 48 } },
  { name: "Operación", data: { stress: 78, emotion: 55, anxiety: 65 } },
  { name: "Ventas", data: { stress: 65, emotion: 60, anxiety: 52 } },
];

// Datos de tendencia de estrés - 4 trimestres del año, tendencia bajista con pico en Q2
const stressTrendData = {
  general: [
    { month: "Q1", value: 70 },
    { month: "Q2", value: 74 }, // pequeña subida
    { month: "Q3", value: 62 },
    { month: "Q4", value: 55 }, // termina más bajo que Q1
  ],
  Marketing: [
    { month: "Q1", value: 68 },
    { month: "Q2", value: 72 },
    { month: "Q3", value: 60 },
    { month: "Q4", value: 52 },
  ],
  "Recursos Humanos": [
    { month: "Q1", value: 60 },
    { month: "Q2", value: 63 },
    { month: "Q3", value: 55 },
    { month: "Q4", value: 48 },
  ],
  Operación: [
    { month: "Q1", value: 75 },
    { month: "Q2", value: 78 },
    { month: "Q3", value: 66 },
    { month: "Q4", value: 58 },
  ],
  Ventas: [
    { month: "Q1", value: 72 },
    { month: "Q2", value: 76 },
    { month: "Q3", value: 64 },
    { month: "Q4", value: 57 },
  ],
};

// Datos de tendencia de estado emocional - tendencia alcista con curva en Q3
const emotionTrendData = {
  general: [
    { month: "Q1", value: 60 },
    { month: "Q2", value: 68 },
    { month: "Q3", value: 65 }, // pequeña bajada
    { month: "Q4", value: 75 }, // termina más alto
  ],
  Marketing: [
    { month: "Q1", value: 55 },
    { month: "Q2", value: 62 },
    { month: "Q3", value: 60 },
    { month: "Q4", value: 70 },
  ],
  "Recursos Humanos": [
    { month: "Q1", value: 70 },
    { month: "Q2", value: 76 },
    { month: "Q3", value: 73 },
    { month: "Q4", value: 82 },
  ],
  Operación: [
    { month: "Q1", value: 58 },
    { month: "Q2", value: 64 },
    { month: "Q3", value: 61 },
    { month: "Q4", value: 69 },
  ],
  Ventas: [
    { month: "Q1", value: 62 },
    { month: "Q2", value: 69 },
    { month: "Q3", value: 66 },
    { month: "Q4", value: 74 },
  ],
};

// Datos de tendencia de ansiedad - 4 trimestres, tendencia bajista
const anxietyTrendData = {
  general: [
    { month: "Q1", value: 60 },
    { month: "Q2", value: 55 },
    { month: "Q3", value: 50 },
    { month: "Q4", value: 45 },
  ],
  Marketing: [
    { month: "Q1", value: 65 },
    { month: "Q2", value: 60 },
    { month: "Q3", value: 54 },
    { month: "Q4", value: 48 },
  ],
  "Recursos Humanos": [
    { month: "Q1", value: 52 },
    { month: "Q2", value: 48 },
    { month: "Q3", value: 44 },
    { month: "Q4", value: 40 },
  ],
  Operación: [
    { month: "Q1", value: 68 },
    { month: "Q2", value: 62 },
    { month: "Q3", value: 56 },
    { month: "Q4", value: 50 },
  ],
  Ventas: [
    { month: "Q1", value: 63 },
    { month: "Q2", value: 58 },
    { month: "Q3", value: 52 },
    { month: "Q4", value: 47 },
  ],
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      {/* Header con logo y título */}
      <div className="flex items-center gap-3 mb-8">
        <BehumanLogo size={40} />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">BeHuman</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contenido principal - izquierda */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <KpiCard
              title="Estrés general de la compañía"
              value={71}
              subtitle="Índice promedio de estrés percibido"
              showPercentage
              invertColors
            />
            <KpiCard title="Ataques de ansiedad intervenidos" value={4} subtitle="Intervenciones realizadas este mes" />
            <KpiCard
              title="Alertas de casos críticos"
              value={7}
              subtitle="Casos que requieren atención inmediata"
              invertColors
            />
          </div>

          <div className="mb-8">
            <TrendChart
              metrics={[
                {
                  key: "stress",
                  label: "Estrés",
                  color: "hsl(0, 70%, 50%)",
                  isPercentage: true,
                  data: stressTrendData,
                },
                {
                  key: "emotion",
                  label: "Estado emocional",
                  color: "hsl(142, 70%, 45%)",
                  isPercentage: false,
                  data: emotionTrendData,
                },
                {
                  key: "anxiety",
                  label: "Ansiedad",
                  color: "hsl(45, 90%, 50%)",
                  isPercentage: true,
                  data: anxietyTrendData,
                },
              ]}
            />
          </div>
        </div>

        {/* Rompecabezas - derecha */}
        <div className="lg:w-80 xl:w-96">
          <h2 className="text-xl font-semibold text-foreground mb-6">Por área</h2>
          <PuzzleAreaCards areas={areasData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
