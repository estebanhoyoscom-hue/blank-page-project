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

// Datos de tendencia de estrés (más aleatorios)
const stressTrendData = {
  general: [
    { month: "Ene", value: 58 },
    { month: "Feb", value: 72 },
    { month: "Mar", value: 45 },
    { month: "Abr", value: 81 },
    { month: "May", value: 63 },
    { month: "Jun", value: 55 },
    { month: "Jul", value: 71 },
  ],
  Marketing: [
    { month: "Ene", value: 75 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 88 },
    { month: "Abr", value: 61 },
    { month: "May", value: 79 },
    { month: "Jun", value: 45 },
    { month: "Jul", value: 72 },
  ],
  "Recursos Humanos": [
    { month: "Ene", value: 42 },
    { month: "Feb", value: 68 },
    { month: "Mar", value: 35 },
    { month: "Abr", value: 58 },
    { month: "May", value: 47 },
    { month: "Jun", value: 72 },
    { month: "Jul", value: 54 },
  ],
  Operación: [
    { month: "Ene", value: 82 },
    { month: "Feb", value: 56 },
    { month: "Mar", value: 91 },
    { month: "Abr", value: 67 },
    { month: "May", value: 84 },
    { month: "Jun", value: 59 },
    { month: "Jul", value: 78 },
  ],
  Ventas: [
    { month: "Ene", value: 51 },
    { month: "Feb", value: 78 },
    { month: "Mar", value: 42 },
    { month: "Abr", value: 85 },
    { month: "May", value: 58 },
    { month: "Jun", value: 69 },
    { month: "Jul", value: 65 },
  ],
};

// Datos de tendencia de estado emocional
const emotionTrendData = {
  general: [
    { month: "Ene", value: 72 },
    { month: "Feb", value: 48 },
    { month: "Mar", value: 81 },
    { month: "Abr", value: 55 },
    { month: "May", value: 68 },
    { month: "Jun", value: 42 },
    { month: "Jul", value: 62 },
  ],
  Marketing: [
    { month: "Ene", value: 35 },
    { month: "Feb", value: 62 },
    { month: "Mar", value: 28 },
    { month: "Abr", value: 51 },
    { month: "May", value: 44 },
    { month: "Jun", value: 38 },
    { month: "Jul", value: 39 },
  ],
  "Recursos Humanos": [
    { month: "Ene", value: 68 },
    { month: "Feb", value: 82 },
    { month: "Mar", value: 59 },
    { month: "Abr", value: 75 },
    { month: "May", value: 88 },
    { month: "Jun", value: 64 },
    { month: "Jul", value: 71 },
  ],
  Operación: [
    { month: "Ene", value: 52 },
    { month: "Feb", value: 41 },
    { month: "Mar", value: 67 },
    { month: "Abr", value: 48 },
    { month: "May", value: 58 },
    { month: "Jun", value: 72 },
    { month: "Jul", value: 55 },
  ],
  Ventas: [
    { month: "Ene", value: 61 },
    { month: "Feb", value: 74 },
    { month: "Mar", value: 52 },
    { month: "Abr", value: 68 },
    { month: "May", value: 45 },
    { month: "Jun", value: 79 },
    { month: "Jul", value: 60 },
  ],
};

// Datos de tendencia de ansiedad
const anxietyTrendData = {
  general: [
    { month: "Ene", value: 45 },
    { month: "Feb", value: 62 },
    { month: "Mar", value: 31 },
    { month: "Abr", value: 58 },
    { month: "May", value: 42 },
    { month: "Jun", value: 51 },
    { month: "Jul", value: 39 },
  ],
  Marketing: [
    { month: "Ene", value: 68 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 72 },
    { month: "Abr", value: 52 },
    { month: "May", value: 65 },
    { month: "Jun", value: 78 },
    { month: "Jul", value: 61 },
  ],
  "Recursos Humanos": [
    { month: "Ene", value: 38 },
    { month: "Feb", value: 55 },
    { month: "Mar", value: 42 },
    { month: "Abr", value: 61 },
    { month: "May", value: 35 },
    { month: "Jun", value: 48 },
    { month: "Jul", value: 48 },
  ],
  Operación: [
    { month: "Ene", value: 71 },
    { month: "Feb", value: 58 },
    { month: "Mar", value: 82 },
    { month: "Abr", value: 49 },
    { month: "May", value: 75 },
    { month: "Jun", value: 62 },
    { month: "Jul", value: 65 },
  ],
  Ventas: [
    { month: "Ene", value: 48 },
    { month: "Feb", value: 65 },
    { month: "Mar", value: 38 },
    { month: "Abr", value: 72 },
    { month: "May", value: 52 },
    { month: "Jun", value: 45 },
    { month: "Jul", value: 52 },
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
          <p className="text-muted-foreground mb-8">
            Este dashboard muestra el estado emocional de la compañía a partir de datos psicométricos anónimos de los
            empleados.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <KpiCard
              title="Estrés general de la compañía"
              value={71}
              subtitle="Índice promedio de estrés percibido"
              showPercentage
              invertColors
            />
            <KpiCard
              title="Estado emocional promedio"
              value={62}
              subtitle="Combinación de ánimo, estrés y ansiedad (0–100)"
            />
            <KpiCard
              title="Ansiedad general"
              value={39}
              subtitle="Nivel promedio de ansiedad"
              showPercentage
              invertColors
            />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <TrendChart
              title="Tendencia de estrés"
              metricLabel="Estrés"
              color="hsl(0, 70%, 50%)"
              data={stressTrendData}
            />
            <TrendChart
              title="Tendencia de estado emocional"
              metricLabel="Estado emocional"
              color="hsl(142, 70%, 45%)"
              data={emotionTrendData}
            />
            <TrendChart
              title="Tendencia de ansiedad"
              metricLabel="Ansiedad"
              color="hsl(45, 90%, 50%)"
              data={anxietyTrendData}
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
