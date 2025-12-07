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

const getEmotionColorClass = (value: number) => {
  if (value <= 40) return "bg-red-500/10 border-red-500/30";
  if (value <= 70) return "bg-yellow-500/10 border-yellow-500/30";
  return "bg-green-500/10 border-green-500/30";
};

const getEmotionTextColor = (value: number) => {
  if (value <= 40) return "text-red-600";
  if (value <= 70) return "text-yellow-600";
  return "text-green-600";
};

// Organic decorative shapes
const OrganicShape1 = () => (
  <svg className="absolute top-2 right-2 w-12 h-12 opacity-20" viewBox="0 0 100 100">
    <path
      d="M50 5 C75 5, 95 25, 95 50 C95 75, 75 95, 50 95 C25 95, 5 75, 5 50 C5 25, 25 5, 50 5"
      fill="currentColor"
      className="text-primary"
    />
    <circle cx="30" cy="35" r="8" fill="currentColor" className="text-primary/50" />
    <circle cx="70" cy="65" r="6" fill="currentColor" className="text-primary/50" />
  </svg>
);

const OrganicShape2 = () => (
  <svg className="absolute top-2 right-2 w-12 h-12 opacity-20" viewBox="0 0 100 100">
    <path
      d="M20 50 Q35 20, 50 50 Q65 80, 80 50 Q95 20, 80 50 Q65 80, 50 50 Q35 20, 20 50"
      fill="currentColor"
      className="text-primary"
    />
    <ellipse cx="50" cy="30" rx="15" ry="10" fill="currentColor" className="text-primary/40" />
  </svg>
);

const OrganicShape3 = () => (
  <svg className="absolute top-2 right-2 w-12 h-12 opacity-20" viewBox="0 0 100 100">
    <path
      d="M50 10 C80 10, 90 40, 75 60 C60 80, 40 80, 25 60 C10 40, 20 10, 50 10"
      fill="currentColor"
      className="text-primary"
    />
    <path
      d="M35 45 Q50 25, 65 45 Q50 65, 35 45"
      fill="currentColor"
      className="text-primary/60"
    />
  </svg>
);

const OrganicShape4 = () => (
  <svg className="absolute top-2 right-2 w-12 h-12 opacity-20" viewBox="0 0 100 100">
    <path
      d="M50 5 Q90 25, 75 50 Q90 75, 50 95 Q10 75, 25 50 Q10 25, 50 5"
      fill="currentColor"
      className="text-primary"
    />
    <circle cx="50" cy="50" r="12" fill="currentColor" className="text-primary/50" />
  </svg>
);

const shapes = [OrganicShape1, OrganicShape2, OrganicShape3, OrganicShape4];

const AreaCard = ({ name, data }: AreaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Use a consistent shape based on name
  const shapeIndex = name.length % shapes.length;
  const ShapeComponent = shapes[shapeIndex];
  
  const emotionColorClass = getEmotionColorClass(data.emotion);
  const emotionTextColor = getEmotionTextColor(data.emotion);

  return (
    <Card
      className={`shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg relative overflow-hidden border ${emotionColorClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShapeComponent />
      <CardContent className="p-6 relative z-10">
        <p className="text-lg font-semibold text-foreground mb-2">{name}</p>
        
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isHovered ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Estrés</span>
              <span className="text-sm font-medium text-foreground">{data.stress}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Emoción</span>
              <span className={`text-sm font-medium ${emotionTextColor}`}>{data.emotion}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Ansiedad</span>
              <span className="text-sm font-medium text-foreground">{data.anxiety}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaCard;
