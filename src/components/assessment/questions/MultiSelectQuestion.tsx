import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface MultiSelectQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string[]) => void;
}

const symptomEmojis: Record<string, string> = {
  "Aceleración del corazón": "💓",
  "Tensión muscular": "💪",
  "Dificultad para respirar": "🌬️",
  "Problemas de sueño": "😴",
  "Ninguno": "✨",
};

const MultiSelectQuestion = ({ question, options, onAnswer }: MultiSelectQuestionProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    if (option === "Ninguno") {
      setSelected(selected.includes("Ninguno") ? [] : ["Ninguno"]);
      return;
    }
    
    const newSelected = selected.filter(s => s !== "Ninguno");
    if (newSelected.includes(option)) {
      setSelected(newSelected.filter(s => s !== option));
    } else {
      setSelected([...newSelected, option]);
    }
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      onAnswer(selected);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium text-foreground leading-relaxed">
        {question}
      </p>

      <p className="text-sm text-muted-foreground">
        Selecciona todos los que apliquen
      </p>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={`
                w-full py-5 px-4 rounded-2xl border-2 text-left
                transition-all duration-200 active:scale-[0.98]
                flex items-center justify-between
                ${isSelected 
                  ? 'bg-primary/10 border-primary text-foreground' 
                  : 'bg-card border-border/50 text-muted-foreground hover:border-border'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{symptomEmojis[option] || "•"}</span>
                <span className="font-medium">{option}</span>
              </div>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <Button 
          onClick={handleSubmit}
          className="w-full py-6 text-lg"
        >
          Continuar
        </Button>
      )}
    </div>
  );
};

export default MultiSelectQuestion;
