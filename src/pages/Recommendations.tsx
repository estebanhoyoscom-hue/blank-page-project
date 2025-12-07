import { useState } from "react";
import { ArrowLeft, Lightbulb, Heart, Brain, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: "stress" | "anxiety" | "mood" | "social";
  priority: "high" | "medium" | "low";
  icon: React.ReactNode;
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "Pausas activas cada 2 horas",
    description: "Implementa pausas de 5-10 minutos para reducir el estrés acumulado durante la jornada laboral.",
    category: "stress",
    priority: "high",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "Sesiones de mindfulness grupales",
    description: "Organiza sesiones semanales de meditación guiada para el equipo de Marketing.",
    category: "anxiety",
    priority: "high",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Programa de reconocimiento",
    description: "Refuerza el reconocimiento entre pares para mejorar el estado emocional general.",
    category: "mood",
    priority: "medium",
    icon: <Heart className="h-5 w-5" />,
  },
  {
    id: "4",
    title: "Actividades de integración",
    description: "Planifica actividades sociales mensuales para fortalecer los vínculos del equipo.",
    category: "social",
    priority: "medium",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "5",
    title: "Flexibilidad horaria",
    description: "Considera implementar horarios flexibles para reducir la ansiedad relacionada con el balance vida-trabajo.",
    category: "anxiety",
    priority: "low",
    icon: <Lightbulb className="h-5 w-5" />,
  },
];

const categoryColors = {
  stress: "bg-red-100 text-red-700 border-red-200",
  anxiety: "bg-amber-100 text-amber-700 border-amber-200",
  mood: "bg-emerald-100 text-emerald-700 border-emerald-200",
  social: "bg-blue-100 text-blue-700 border-blue-200",
};

const categoryLabels = {
  stress: "Estrés",
  anxiety: "Ansiedad",
  mood: "Estado emocional",
  social: "Social",
};

const priorityColors = {
  high: "bg-primary text-primary-foreground",
  medium: "bg-secondary text-secondary-foreground",
  low: "bg-muted text-muted-foreground",
};

const priorityLabels = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

const Recommendations = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const filteredRecommendations = filter === "all" 
    ? recommendations 
    : recommendations.filter(r => r.category === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Recomendaciones</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="p-4 pb-8 space-y-6">
        {/* Intro */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Acciones sugeridas</h2>
          <p className="text-sm text-muted-foreground">
            Basado en los datos emocionales de tu equipo, te recomendamos las siguientes acciones.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["all", "stress", "anxiety", "mood", "social"].map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat)}
              className="whitespace-nowrap"
            >
              {cat === "all" ? "Todas" : categoryLabels[cat as keyof typeof categoryLabels]}
            </Button>
          ))}
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.id} className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${categoryColors[rec.category]}`}>
                      {rec.icon}
                    </div>
                    <CardTitle className="text-base font-semibold text-foreground leading-tight">
                      {rec.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={categoryColors[rec.category]}>
                    {categoryLabels[rec.category]}
                  </Badge>
                  <Badge className={priorityColors[rec.priority]}>
                    Prioridad {priorityLabels[rec.priority]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Recommendations;
