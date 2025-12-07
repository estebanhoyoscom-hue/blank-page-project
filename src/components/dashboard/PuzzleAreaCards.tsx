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

const getEmotionColor = (value: number) => {
  if (value <= 40) return { fill: "#fecaca", stroke: "#f87171" }; // red
  if (value <= 70) return { fill: "#fef08a", stroke: "#facc15" }; // yellow
  return { fill: "#bbf7d0", stroke: "#4ade80" }; // green
};

const getEmotionTextColor = (value: number) => {
  if (value <= 40) return "text-red-600";
  if (value <= 70) return "text-yellow-600";
  return "text-green-600";
};

// SVG puzzle piece paths
const puzzlePaths = {
  "top-left": "M 0 0 L 120 0 L 120 50 C 130 50, 130 70, 120 70 L 120 120 L 70 120 C 70 130, 50 130, 50 120 L 0 120 Z",
  "top-right": "M 0 0 L 120 0 L 120 120 L 70 120 C 70 130, 50 130, 50 120 L 0 120 L 0 70 C -10 70, -10 50, 0 50 Z",
  "bottom-left": "M 0 0 L 50 0 C 50 -10, 70 -10, 70 0 L 120 0 L 120 50 C 130 50, 130 70, 120 70 L 120 120 L 0 120 Z",
  "bottom-right": "M 0 0 L 50 0 C 50 -10, 70 -10, 70 0 L 120 0 L 120 120 L 0 120 L 0 70 C -10 70, -10 50, 0 50 Z",
};

const PuzzleCard = ({ name, data, position }: PuzzleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = getEmotionColor(data.emotion);
  const emotionTextColor = getEmotionTextColor(data.emotion);

  return (
    <div
      className="relative cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: "160px", height: "160px" }}
    >
      <svg
        viewBox="-10 -10 140 140"
        className="absolute inset-0 w-full h-full drop-shadow-md"
        style={{ overflow: "visible" }}
      >
        <path
          d={puzzlePaths[position]}
          fill={colors.fill}
          stroke={colors.stroke}
          strokeWidth="2"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 z-10">
        <p className="text-sm font-semibold text-foreground text-center leading-tight">{name}</p>
        
        <div
          className={`overflow-hidden transition-all duration-300 w-full ${
            isHovered ? "max-h-32 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1 text-center">
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] text-muted-foreground">Estrés</span>
              <span className="text-[10px] font-medium text-foreground">{data.stress}%</span>
            </div>
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] text-muted-foreground">Emoción</span>
              <span className={`text-[10px] font-medium ${emotionTextColor}`}>{data.emotion}%</span>
            </div>
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] text-muted-foreground">Ansiedad</span>
              <span className="text-[10px] font-medium text-foreground">{data.anxiety}%</span>
            </div>
          </div>
        </div>
      </div>
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
    <div className="flex justify-center">
      <div 
        className="grid grid-cols-2"
        style={{ 
          gap: "0px",
          marginLeft: "-10px",
          marginTop: "-10px"
        }}
      >
        {areas.slice(0, 4).map((area, index) => (
          <PuzzleCard
            key={area.name}
            name={area.name}
            data={area.data}
            position={positions[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzleAreaCards;
