import { Button } from "@/components/ui/button";

interface YesNoQuestionProps {
  question: string;
  options?: string[];
  onAnswer: (answer: string) => void;
}

const defaultOptions = ["Sí", "A veces", "No"];

const YesNoQuestion = ({ question, options, onAnswer }: YesNoQuestionProps) => {
  const displayOptions = options || defaultOptions;

  const getOptionStyle = (index: number, total: number) => {
    if (total === 2) {
      return index === 0 
        ? "bg-primary/10 border-primary/30 hover:bg-primary/20" 
        : "bg-muted/50 border-border/50 hover:bg-muted";
    }
    if (index === 0) return "bg-green-500/10 border-green-500/30 hover:bg-green-500/20";
    if (index === total - 1) return "bg-red-500/10 border-red-500/30 hover:bg-red-500/20";
    return "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20";
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium text-foreground leading-relaxed">
        {question}
      </p>

      <div className="space-y-3">
        {displayOptions.map((option, index) => (
          <Button
            key={option}
            variant="outline"
            onClick={() => onAnswer(option)}
            className={`
              w-full py-8 text-lg font-medium rounded-2xl border-2
              transition-all duration-200 active:scale-[0.98]
              ${getOptionStyle(index, displayOptions.length)}
            `}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default YesNoQuestion;
