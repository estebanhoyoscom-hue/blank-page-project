import KpiCard from "@/components/dashboard/KpiCard";
import AreaCard from "@/components/dashboard/AreaCard";
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
    <div className="min-h-screen bg-background p-6 md:p-10 relative">
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <BehumanLogo size={40} />
      </div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Dashboard emocional de la compañía</h1>
        <p className="text-muted-foreground mb-8">
          Este dashboard muestra el estado emocional de la compañía a partir de datos psicométricos anónimos de los
          empleados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <KpiCard
            title="Estrés general de la compañía"
            value={68}
            subtitle="Índice promedio de estrés percibido (0–100)"
          />
          <KpiCard
            title="Estado emocional promedio"
            value={62}
            subtitle="Combinación de ánimo, estrés y ansiedad (0–100)"
          />
          <KpiCard title="Ansiedad general" value={55} subtitle="Nivel promedio de ansiedad (0–100)" />
        </div>

        <div className="mb-8">
          <StressTrendChart />
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-4">Por área</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {areasData.map((area) => (
            <AreaCard key={area.name} name={area.name} data={area.data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
