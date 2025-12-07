interface AreaData {
  anxietyAttacks: number;
  criticalAlerts: number;
}

interface PuzzleCardProps {
  name: string;
  data: AreaData;
}

// Colors for anxiety attacks (green = low is good)
const getAnxietyColor = (value: number) => {
  if (value <= 3) return "bg-green-500/15 border-green-500/30";
  if (value <= 6) return "bg-yellow-500/15 border-yellow-500/30";
  return "bg-red-500/15 border-red-500/30";
};

// Colors for critical alerts (green = low is good)
const getAlertsColor = (value: number) => {
  if (value <= 3) return "bg-green-500/15 border-green-500/30";
  if (value <= 6) return "bg-yellow-500/15 border-yellow-500/30";
  return "bg-red-500/15 border-red-500/30";
};

const PuzzleCard = ({ name, data }: PuzzleCardProps) => {
  const anxietyColorClass = getAnxietyColor(data.anxietyAttacks);
  const alertsColorClass = getAlertsColor(data.criticalAlerts);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-foreground text-center">{name}</p>
      <div className="flex gap-2 justify-center">
        <div 
          className={`w-12 h-12 rounded-lg border flex items-center justify-center ${anxietyColorClass}`}
        >
          <span className="text-lg font-bold text-foreground">{data.anxietyAttacks}</span>
        </div>
        <div 
          className={`w-12 h-12 rounded-lg border flex items-center justify-center ${alertsColorClass}`}
        >
          <span className="text-lg font-bold text-foreground">{data.criticalAlerts}</span>
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
  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center text-xs text-muted-foreground">
        <span>Ataques</span>
        <span>Alertas</span>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {areas.slice(0, 4).map((area) => (
          <PuzzleCard
            key={area.name}
            name={area.name}
            data={area.data}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzleAreaCards;
