import KpiCard from "@/components/dashboard/KpiCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Dashboard emocional de la compañía
        </h1>
        <p className="text-muted-foreground mb-8">
          Este dashboard muestra el estado emocional de la compañía a partir de datos psicométricos anónimos de los empleados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <KpiCard
            title="Ansiedad general"
            value={55}
            subtitle="Nivel promedio de ansiedad (0–100)"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
