import KpiCard from "@/components/dashboard/KpiCard";
import PuzzleAreaCards from "@/components/dashboard/PuzzleAreaCards";
import StressTrendChart from "@/components/dashboard/StressTrendChart";
import BehumanLogo from "@/components/BehumanLogo";

const areasData = [
  { name: "Marketing", data: { stress: 72, emotion: 39, anxiety: 61 } },
  { name: "Recursos Humanos", data: { stress: 54, emotion: 71, anxiety: 48 } },
  { name: "Operación", data: { stress: 78, emotion: 55, anxiety: 65 } },
  { name: "Ventas", data: { stress: 65, emotion: 60, anxiety: 52 } },
];

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
              value={68}
              subtitle="Índice promedio de estrés percibido"
              showPercentage
            />
            <KpiCard
              title="Estado emocional promedio"
              value={62}
              subtitle="Combinación de ánimo, estrés y ansiedad (0–100)"
            />
            <KpiCard 
              title="Ansiedad general" 
              value={55} 
              subtitle="Nivel promedio de ansiedad" 
              showPercentage
            />
          </div>

          <div className="mb-8">
            <StressTrendChart />
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
