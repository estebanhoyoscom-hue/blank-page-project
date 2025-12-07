import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WordInputQuestionProps {
  question: string;
  onAnswer: (answer: string) => void;
}

const suggestions = [
  "Agotado", "Abrumado", "Tenso", "Cansado", 
  "Bien", "Tranquilo", "Equilibrado", "Estable"
];

const WordInputQuestion = ({ question, onAnswer }: WordInputQuestionProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim()) {
      onAnswer(value.trim());
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium text-foreground leading-relaxed">
        {question}
      </p>
      
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe una palabra..."
        className="text-center text-lg py-6 bg-card border-border/50"
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          O elige una sugerencia:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestions.map((word) => (
            <Button
              key={word}
              variant="outline"
              size="sm"
              onClick={() => onAnswer(word)}
              className="rounded-full border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all"
            >
              {word}
            </Button>
          ))}
        </div>
      </div>

      {value.trim() && (
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

export default WordInputQuestion;
