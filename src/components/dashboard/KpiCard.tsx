import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: number;
  subtitle: string;
  showPercentage?: boolean;
}

const getColorByValue = (value: number) => {
  if (value <= 40) return "bg-red-500/15 border-red-500/30";
  if (value <= 70) return "bg-yellow-500/15 border-yellow-500/30";
  return "bg-green-500/15 border-green-500/30";
};

const getTextColorByValue = (value: number) => {
  if (value <= 40) return "text-red-600";
  if (value <= 70) return "text-yellow-600";
  return "text-green-600";
};

const KpiCard = ({ title, value, subtitle, showPercentage = false }: KpiCardProps) => {
  const cardColor = getColorByValue(value);
  const textColor = getTextColorByValue(value);

  return (
    <Card className={`shadow-md border ${cardColor}`}>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        <p className={`text-4xl font-bold mb-2 ${textColor}`}>
          {value}{showPercentage && "%"}
        </p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
