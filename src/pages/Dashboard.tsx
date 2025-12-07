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

// Datos de tendencia de estrés - trimestral Oct-Nov-Dic con comportamiento realista
const stressTrendData = {
  general: [
    { month: "Oct", value: 58 },
    { month: "Nov", value: 65 },
    { month: "Dic", value: 71 },
  ],
  Marketing: [
    { month: "Oct", value: 62 },
    { month: "Nov", value: 68 },
    { month: "Dic", value: 72 },
  ],
  "Recursos Humanos": [
    { month: "Oct", value: 48 },
    { month: "Nov", value: 52 },
    { month: "Dic", value: 54 },
  ],
  Operación: [
    { month: "Oct", value: 70 },
    { month: "Nov", value: 75 },
    { month: "Dic", value: 78 },
  ],
  Ventas: [
    { month: "Oct", value: 55 },
    { month: "Nov", value: 62 },
    { month: "Dic", value: 65 },
  ],
};

// Datos de tendencia de estado emocional - trimestral
const emotionTrendData = {
  general: [
    { month: "Oct", value: 68 },
    { month: "Nov", value: 64 },
    { month: "Dic", value: 62 },
  ],
  Marketing: [
    { month: "Oct", value: 45 },
    { month: "Nov", value: 41 },
    { month: "Dic", value: 39 },
  ],
  "Recursos Humanos": [
    { month: "Oct", value: 75 },
    { month: "Nov", value: 72 },
    { month: "Dic", value: 71 },
  ],
  Operación: [
    { month: "Oct", value: 60 },
    { month: "Nov", value: 57 },
    { month: "Dic", value: 55 },
  ],
  Ventas: [
    { month: "Oct", value: 65 },
    { month: "Nov", value: 62 },
    { month: "Dic", value: 60 },
  ],
};

// Datos de tendencia de ansiedad - trimestral
const anxietyTrendData = {
  general: [
    { month: "Oct", value: 35 },
    { month: "Nov", value: 42 },
    { month: "Dic", value: 39 },
  ],
  Marketing: [
    { month: "Oct", value: 55 },
    { month: "Nov", value: 62 },
    { month: "Dic", value: 61 },
  ],
  "Recursos Humanos": [
    { month: "Oct", value: 42 },
    { month: "Nov", value: 46 },
    { month: "Dic", value: 48 },
  ],
  Operación: [
    { month: "Oct", value: 58 },
    { month: "Nov", value: 63 },
    { month: "Dic", value: 65 },
  ],
  Ventas: [
    { month: "Oct", value: 48 },
    { month: "Nov", value: 53 },
    { month: "Dic", value: 52 },
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
            <KpiCard
              title="Ataques de ansiedad intervenidos"
              value={4}
              subtitle="Intervenciones realizadas este mes"
            />
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
