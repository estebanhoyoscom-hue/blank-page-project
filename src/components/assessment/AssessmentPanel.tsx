import { useState } from "react";
import { Zap, Brain, Heart, ChevronRight, ClipboardCheck } from "lucide-react";
import { assessmentBlocks } from "@/data/assessmentQuestions";
import TestBlock from "./TestBlock";

const iconMap = {
  Zap,
  Brain,
  Heart,
};

type ViewState = 'list' | 'test';

const AssessmentPanel = () => {
  const [view, setView] = useState<ViewState>('list');
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [completedBlocks, setCompletedBlocks] = useState<string[]>([]);

  const handleStartTest = (blockId: string) => {
    setActiveBlockId(blockId);
    setView('test');
  };

  const handleCompleteTest = () => {
    if (activeBlockId) {
      setCompletedBlocks([...completedBlocks, activeBlockId]);
    }
    setView('list');
    setActiveBlockId(null);
  };

  const handleBack = () => {
    setView('list');
    setActiveBlockId(null);
  };

  if (view === 'test' && activeBlockId) {
    const block = assessmentBlocks.find(b => b.id === activeBlockId);
    if (block) {
      return (
        <TestBlock 
          block={block} 
          onComplete={handleCompleteTest}
          onBack={handleBack}
        />
      );
    }
  }

  return (
    <div className="min-h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Check-in</h1>
        </div>
        <p className="text-muted-foreground">
          Tómate un momento para evaluar cómo te sientes
        </p>
      </div>

      {/* Test blocks */}
      <div className="space-y-4">
        {assessmentBlocks.map((block) => {
          const Icon = iconMap[block.icon as keyof typeof iconMap] || Zap;
          const isCompleted = completedBlocks.includes(block.id);

          return (
            <button
              key={block.id}
              onClick={() => handleStartTest(block.id)}
              className={`
                w-full p-4 rounded-2xl border-2 text-left
                transition-all duration-200 active:scale-[0.98]
                flex items-center gap-4
                ${isCompleted 
                  ? 'bg-muted/50 border-border/30' 
                  : 'bg-card border-border/50 hover:border-primary/30'
                }
              `}
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ 
                  backgroundColor: isCompleted ? 'hsl(var(--muted))' : `${block.color}15`
                }}
              >
                <Icon 
                  className="w-7 h-7" 
                  style={{ color: isCompleted ? 'hsl(var(--muted-foreground))' : block.color }} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold text-lg ${isCompleted ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {block.title}
                  </h3>
                  {isCompleted && (
                    <span className="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">
                      Completado
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {block.subtitle}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {block.questions.length} preguntas • ~{block.questions.length} min
                </p>
              </div>

              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Info footer */}
      <div className="mt-auto pt-6">
        <div className="bg-muted/30 rounded-2xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 Tus respuestas son privadas y te ayudan a entender mejor tu bienestar emocional
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPanel;
