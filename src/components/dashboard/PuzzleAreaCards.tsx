import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface AreaData {
  stress: number;
  emotion: number;
  anxiety: number;
}

interface PuzzleCardProps {
  name: string;
  data: AreaData;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
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

// Puzzle piece shapes using clip-path
const getPuzzleClipPath = (position: PuzzleCardProps["position"]) => {
  switch (position) {
    case "top-left":
      // Right notch out, bottom notch out
      return `polygon(
        0% 0%, 
        75% 0%, 
        75% 35%, 
        100% 35%, 
        100% 65%, 
        75% 65%, 
        75% 100%, 
        35% 100%, 
        35% 75%, 
        65% 75%, 
        65% 100%, 
        0% 100%
      )`;
    case "top-right":
      // Left notch in, bottom notch out
      return `polygon(
        25% 0%, 
        100% 0%, 
        100% 100%, 
        65% 100%, 
        65% 75%, 
        35% 75%, 
        35% 100%, 
        0% 100%, 
        0% 65%, 
        25% 65%, 
        25% 35%, 
        0% 35%, 
        0% 0%, 
        25% 0%
      )`;
    case "bottom-left":
      // Right notch out, top notch in
      return `polygon(
        0% 0%, 
        35% 0%, 
        35% 25%, 
        65% 25%, 
        65% 0%, 
        75% 0%, 
        75% 35%, 
        100% 35%, 
        100% 65%, 
        75% 65%, 
        75% 100%, 
        0% 100%
      )`;
    case "bottom-right":
      // Left notch in, top notch in
      return `polygon(
        25% 0%, 
        35% 0%, 
        35% 25%, 
        65% 25%, 
        65% 0%, 
        100% 0%, 
        100% 100%, 
        0% 100%, 
        0% 65%, 
        25% 65%, 
        25% 35%, 
        0% 35%, 
        0% 0%, 
        25% 0%
      )`;
    default:
      return "none";
  }
};

const PuzzleCard = ({ name, data, position }: PuzzleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const emotionColorClass = getEmotionColorClass(data.emotion);
  const emotionTextColor = getEmotionTextColor(data.emotion);

  return (
    <div
      className="relative cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
      style={{
        clipPath: getPuzzleClipPath(position),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`h-full shadow-md border-2 ${emotionColorClass} rounded-none`}
      >
        <CardContent className="p-6 min-h-[140px] flex flex-col justify-center">
          <p className="text-lg font-semibold text-foreground mb-2">{name}</p>
          
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isHovered ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-1 border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Estrés</span>
                <span className="text-xs font-medium text-foreground">{data.stress}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Emoción</span>
                <span className={`text-xs font-medium ${emotionTextColor}`}>{data.emotion}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Ansiedad</span>
                <span className="text-xs font-medium text-foreground">{data.anxiety}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface AreaDataItem {
  name: string;
  data: AreaData;
}

interface PuzzleAreaCardsProps {
  areas: AreaDataItem[];
}

const PuzzleAreaCards = ({ areas }: PuzzleAreaCardsProps) => {
  const positions: PuzzleCardProps["position"][] = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ];

  return (
    <div className="grid grid-cols-2 gap-0 max-w-2xl mx-auto">
      {areas.slice(0, 4).map((area, index) => (
        <PuzzleCard
          key={area.name}
          name={area.name}
          data={area.data}
          position={positions[index]}
        />
      ))}
    </div>
  );
};

export default PuzzleAreaCards;
