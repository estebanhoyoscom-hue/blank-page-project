import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ScaleQuestionProps {
  question: string;
  scaleLabels?: { low: string; high: string };
  onAnswer: (answer: number) => void;
}

const ScaleQuestion = ({ question, scaleLabels, onAnswer }: ScaleQuestionProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  const getEmoji = (value: number) => {
    if (value <= 2) return "😌";
    if (value <= 4) return "😐";
    if (value <= 6) return "😕";
    if (value <= 8) return "😰";
    return "😫";
  };

  const getColor = (value: number, isSelected: boolean) => {
    if (!isSelected) return "bg-card border-border/50 text-muted-foreground";
    if (value <= 3) return "bg-green-500/20 border-green-500 text-green-600";
    if (value <= 6) return "bg-yellow-500/20 border-yellow-500 text-yellow-600";
    return "bg-red-500/20 border-red-500 text-red-600";
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium text-foreground leading-relaxed">
        {question}
      </p>

      {selected !== null && (
        <div className="text-center">
          <span className="text-6xl">{getEmoji(selected)}</span>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            onClick={() => setSelected(num)}
            className={`
              aspect-square rounded-xl border-2 font-bold text-lg
              transition-all duration-200 active:scale-95
              ${getColor(num, selected === num)}
              ${selected === num ? 'ring-2 ring-offset-2 ring-offset-background' : ''}
            `}
          >
            {num}
          </button>
        ))}
      </div>

      {scaleLabels && (
        <div className="flex justify-between text-sm text-muted-foreground px-2">
          <span>{scaleLabels.low}</span>
          <span>{scaleLabels.high}</span>
        </div>
      )}

      {selected !== null && (
        <Button 
          onClick={() => onAnswer(selected)}
          className="w-full py-6 text-lg"
        >
          Continuar
        </Button>
      )}
    </div>
  );
};

export default ScaleQuestion;
