import { Button } from "@/components/ui/button";

interface FrequencyQuestionProps {
  question: string;
  onAnswer: (answer: string) => void;
}

const frequencies = [
  { label: "Nada", emoji: "✨", color: "bg-green-500/10 border-green-500/30" },
  { label: "Un poco", emoji: "🌿", color: "bg-emerald-500/10 border-emerald-500/30" },
  { label: "Moderado", emoji: "🌤️", color: "bg-yellow-500/10 border-yellow-500/30" },
  { label: "Bastante", emoji: "🌧️", color: "bg-orange-500/10 border-orange-500/30" },
  { label: "Mucho", emoji: "⛈️", color: "bg-red-500/10 border-red-500/30" },
];

const FrequencyQuestion = ({ question, onAnswer }: FrequencyQuestionProps) => {
  return (
    <div className="space-y-6">
      <p className="text-lg font-medium text-foreground leading-relaxed">
        {question}
      </p>

      <div className="space-y-3">
        {frequencies.map((freq) => (
          <Button
            key={freq.label}
            variant="outline"
            onClick={() => onAnswer(freq.label)}
            className={`
              w-full py-6 text-base font-medium rounded-2xl border-2
              transition-all duration-200 active:scale-[0.98]
              flex items-center justify-center gap-3
              ${freq.color}
            `}
          >
            <span className="text-2xl">{freq.emoji}</span>
            <span>{freq.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FrequencyQuestion;
