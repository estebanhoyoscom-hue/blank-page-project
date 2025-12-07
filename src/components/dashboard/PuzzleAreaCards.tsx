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

// SVG puzzle piece paths with proper connectors
const puzzlePaths = {
  // Marketing (top-left): bump right, bump bottom
  "top-left": `
    M 0 0 
    L 100 0 
    L 100 35 
    C 100 35, 100 40, 108 40 
    C 108 40, 120 40, 120 50 
    C 120 60, 108 60, 108 60 
    C 100 60, 100 65, 100 65 
    L 100 100 
    L 65 100 
    C 65 100, 60 100, 60 108 
    C 60 108, 60 120, 50 120 
    C 40 120, 40 108, 40 108 
    C 40 100, 35 100, 35 100 
    L 0 100 
    L 0 0 
    Z
  `,
  // RRHH (top-right): hole left, bump bottom
  "top-right": `
    M 0 0 
    L 100 0 
    L 100 100 
    L 65 100 
    C 65 100, 60 100, 60 108 
    C 60 108, 60 120, 50 120 
    C 40 120, 40 108, 40 108 
    C 40 100, 35 100, 35 100 
    L 0 100 
    L 0 65 
    C 0 65, 0 60, -8 60 
    C -8 60, -20 60, -20 50 
    C -20 40, -8 40, -8 40 
    C 0 40, 0 35, 0 35 
    L 0 0 
    Z
  `,
  // Operación (bottom-left): hole top, bump right
  "bottom-left": `
    M 0 0 
    L 35 0 
    C 35 0, 40 0, 40 -8 
    C 40 -8, 40 -20, 50 -20 
    C 60 -20, 60 -8, 60 -8 
    C 60 0, 65 0, 65 0 
    L 100 0 
    L 100 35 
    C 100 35, 100 40, 108 40 
    C 108 40, 120 40, 120 50 
    C 120 60, 108 60, 108 60 
    C 100 60, 100 65, 100 65 
    L 100 100 
    L 0 100 
    L 0 0 
    Z
  `,
  // Ventas (bottom-right): hole left, hole top
  "bottom-right": `
    M 0 0 
    L 35 0 
    C 35 0, 40 0, 40 -8 
    C 40 -8, 40 -20, 50 -20 
    C 60 -20, 60 -8, 60 -8 
    C 60 0, 65 0, 65 0 
    L 100 0 
    L 100 100 
    L 0 100 
    L 0 65 
    C 0 65, 0 60, -8 60 
    C -8 60, -20 60, -20 50 
    C -20 40, -8 40, -8 40 
    C 0 40, 0 35, 0 35 
    L 0 0 
    Z
  `,
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
      style={{ width: "140px", height: "140px" }}
    >
      <svg
        viewBox="-30 -30 160 160"
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
          gap: "10px",
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
