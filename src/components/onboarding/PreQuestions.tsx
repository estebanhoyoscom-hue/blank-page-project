import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import type { OnboardingData } from "@/pages/Onboarding";

interface PreQuestionsProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

const PreQuestions = ({ data, updateData, onComplete }: PreQuestionsProps) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step === 0 && data.nickname.trim()) {
      setStep(1);
    } else if (step === 1 && data.birthday) {
      onComplete();
    }
  };

  const isNextDisabled = step === 0 ? !data.nickname.trim() : !data.birthday;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <div className="flex gap-2 mb-8 justify-center">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-1.5 w-12 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="space-y-6 animate-fade-in">
          {step === 0 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  ¿Cómo quieres que tu Human te llame?
                </h2>
                <p className="text-muted-foreground">
                  Este será tu nombre dentro de BeHuman
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nickname">Tu apodo o nombre</Label>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="Ej: Alex, Caro, JD..."
                  value={data.nickname}
                  onChange={(e) => updateData({ nickname: e.target.value })}
                  className="text-center text-lg h-14"
                  autoFocus
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  ¿Cuál es la fecha de tu cumpleaños?
                </h2>
                <p className="text-muted-foreground">
                  Para personalizar tu experiencia
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthday">Fecha de nacimiento</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={data.birthday}
                  onChange={(e) => updateData({ birthday: e.target.value })}
                  className="text-center text-lg h-14"
                  autoFocus
                />
              </div>
            </>
          )}

          <Button
            onClick={handleNext}
            disabled={isNextDisabled}
            className="w-full h-14 text-lg font-semibold mt-8"
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreQuestions;
