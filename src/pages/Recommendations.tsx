import { useState } from "react";
import { Check, X } from "lucide-react";
import BehumanLogo from "@/components/BehumanLogo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PendingRecommendation {
  id: string;
  title: string;
  area: string;
  cost: number;
  priority: "alta" | "media" | "baja";
}

const pendingRecommendations: PendingRecommendation[] = [
  {
    id: "1",
    title: "Pausas activas cada 2 horas",
    area: "Marketing",
    cost: 500,
    priority: "alta",
  },
  {
    id: "2",
    title: "Sesiones de mindfulness grupales",
    area: "Recursos Humanos",
    cost: 1200,
    priority: "alta",
  },
  {
    id: "3",
    title: "Programa de reconocimiento",
    area: "Operaciones",
    cost: 800,
    priority: "media",
  },
  {
    id: "4",
    title: "Actividades de integración",
    area: "Ventas",
    cost: 1500,
    priority: "media",
  },
  {
    id: "5",
    title: "Flexibilidad horaria",
    area: "Toda la empresa",
    cost: 0,
    priority: "baja",
  },
];

const priorityColors = {
  alta: "bg-red-100 text-red-700 border-red-200",
  media: "bg-amber-100 text-amber-700 border-amber-200",
  baja: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const Recommendations = () => {
  const [monthlyBudget] = useState(5000);
  const [availableBudget, setAvailableBudget] = useState(5000);
  const [recommendations, setRecommendations] = useState(pendingRecommendations);
  const [selectedRecommendation, setSelectedRecommendation] = useState<PendingRecommendation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resultDialog, setResultDialog] = useState<{ open: boolean; approved: boolean }>({ open: false, approved: false });

  const handleRowClick = (rec: PendingRecommendation) => {
    setSelectedRecommendation(rec);
    setDialogOpen(true);
  };

  const handleApprove = () => {
    if (selectedRecommendation) {
      setAvailableBudget(prev => prev - selectedRecommendation.cost);
      setRecommendations(prev => prev.filter(r => r.id !== selectedRecommendation.id));
      setDialogOpen(false);
      setResultDialog({ open: true, approved: true });
    }
  };

  const handleReject = () => {
    if (selectedRecommendation) {
      setRecommendations(prev => prev.filter(r => r.id !== selectedRecommendation.id));
      setDialogOpen(false);
      setResultDialog({ open: true, approved: false });
    }
  };

  const closeResultDialog = () => {
    setResultDialog({ open: false, approved: false });
    setSelectedRecommendation(null);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <BehumanLogo size={40} />
          <span className="text-xl font-bold text-foreground">BeHuman</span>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Presupuesto mensual</p>
          <p className="text-3xl font-bold text-foreground">
            ${availableBudget.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            de ${monthlyBudget.toLocaleString()} disponible
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-2">Peticiones de Recomendación</h1>
          <p className="text-muted-foreground mb-6">
            Haz clic en una petición para aprobar o rechazar el presupuesto.
          </p>

          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recomendación</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Costo</TableHead>
                  <TableHead>Prioridad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recommendations.length > 0 ? (
                  recommendations.map((rec) => (
                    <TableRow
                      key={rec.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleRowClick(rec)}
                    >
                      <TableCell className="font-medium">{rec.title}</TableCell>
                      <TableCell>{rec.area}</TableCell>
                      <TableCell>${rec.cost.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={priorityColors[rec.priority]}>
                          {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No hay peticiones pendientes
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Approval Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprobar Presupuesto</DialogTitle>
            <DialogDescription>
              ¿Deseas aprobar el presupuesto para "{selectedRecommendation?.title}"?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Costo: <span className="font-semibold text-foreground">${selectedRecommendation?.cost.toLocaleString()}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Área: <span className="font-semibold text-foreground">{selectedRecommendation?.area}</span>
            </p>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleReject}>
              <X className="h-4 w-4 mr-2" />
              No, Rechazar
            </Button>
            <Button onClick={handleApprove}>
              <Check className="h-4 w-4 mr-2" />
              Sí, Aprobar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Result Dialog */}
      <Dialog open={resultDialog.open} onOpenChange={closeResultDialog}>
        <DialogContent className="text-center">
          <div className="flex flex-col items-center py-6">
            {resultDialog.approved ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-emerald-600" />
                </div>
                <DialogTitle className="text-xl mb-2">Recomendación Aprobada</DialogTitle>
                <DialogDescription>
                  El presupuesto ha sido asignado correctamente.
                </DialogDescription>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <X className="h-8 w-8 text-red-600" />
                </div>
                <DialogTitle className="text-xl mb-2">Recomendación Rechazada</DialogTitle>
                <DialogDescription>
                  La petición ha sido descartada.
                </DialogDescription>
              </>
            )}
          </div>
          <DialogFooter className="sm:justify-center">
            <Button onClick={closeResultDialog}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Recommendations;
