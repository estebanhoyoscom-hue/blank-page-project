import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface AreaData {
  stress: number;
  emotion: number;
  anxiety: number;
}

interface AreaCardProps {
  name: string;
  data: AreaData;
}

const AreaCard = ({ name, data }: AreaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <p className="text-lg font-semibold text-foreground mb-2">{name}</p>
        
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isHovered ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Estrés</span>
              <span className="text-sm font-medium text-foreground">{data.stress}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Emoción</span>
              <span className="text-sm font-medium text-foreground">{data.emotion}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Ansiedad</span>
              <span className="text-sm font-medium text-foreground">{data.anxiety}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaCard;
