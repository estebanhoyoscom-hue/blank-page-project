import { useState } from "react";
import { ChevronLeft, Zap, Brain, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestBlock as TestBlockType, Question } from "@/data/assessmentQuestions";
import TestProgress from "./TestProgress";
import WordInputQuestion from "./questions/WordInputQuestion";
import ScaleQuestion from "./questions/ScaleQuestion";
import YesNoQuestion from "./questions/YesNoQuestion";
import FrequencyQuestion from "./questions/FrequencyQuestion";
import MultiSelectQuestion from "./questions/MultiSelectQuestion";

interface TestBlockProps {
  block: TestBlockType;
  onComplete: () => void;
  onBack: () => void;
}

const iconMap = {
  Zap,
  Brain,
  Heart,
};

const TestBlock = ({ block, onComplete, onBack }: TestBlockProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});

  const Icon = iconMap[block.icon as keyof typeof iconMap] || Zap;
  const question = block.questions[currentQuestion];

  const handleAnswer = (answer: unknown) => {
    setAnswers({ ...answers, [question.id]: answer });
    
    if (currentQuestion < block.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const renderQuestion = (q: Question) => {
    switch (q.type) {
      case 'word':
        return <WordInputQuestion question={q.text} onAnswer={handleAnswer} />;
      case 'scale':
        return (
          <ScaleQuestion 
            question={q.text} 
            scaleLabels={q.scaleLabels}
            onAnswer={handleAnswer} 
          />
        );
      case 'yesno':
        return (
          <YesNoQuestion 
            question={q.text} 
            options={q.options}
            onAnswer={handleAnswer} 
          />
        );
      case 'frequency':
        return <FrequencyQuestion question={q.text} onAnswer={handleAnswer} />;
      case 'multiselect':
        return (
          <MultiSelectQuestion 
            question={q.text} 
            options={q.options || []}
            onAnswer={handleAnswer} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <div className="p-4 space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="text-muted-foreground -ml-2"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Volver
        </Button>

        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${block.color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color: block.color }} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{block.title}</h2>
            <p className="text-sm text-muted-foreground">{block.subtitle}</p>
          </div>
        </div>

        <TestProgress 
          current={currentQuestion} 
          total={block.questions.length}
          color={block.color}
        />
      </div>

      {/* Question */}
      <div className="flex-1 p-4 pt-6">
        {renderQuestion(question)}
      </div>
    </div>
  );
};

export default TestBlock;
