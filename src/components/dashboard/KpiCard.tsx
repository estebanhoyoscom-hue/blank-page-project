import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: number;
  subtitle: string;
}

const KpiCard = ({ title, value, subtitle }: KpiCardProps) => {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        <p className="text-4xl font-bold text-foreground mb-2">{value}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
