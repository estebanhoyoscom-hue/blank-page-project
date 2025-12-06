import { useState } from "react";
import IntroAnimation from "@/components/onboarding/IntroAnimation";
import PreQuestions from "@/components/onboarding/PreQuestions";
import HumanCreation from "@/components/onboarding/HumanCreation";
import TerminalAnimation from "@/components/onboarding/TerminalAnimation";

export type OnboardingData = {
  nickname: string;
  birthday: string;
  humanAge: string;
  humanGender: string;
  voiceType: string;
  humanName: string;
  autoGenerateName: boolean;
  lifeAxes: string[];
  tenYearGoals: string[];
  shortTermGoals: string[];
  hobbies: string[];
  emotionalHistory: string;
};

const Onboarding = () => {
  const [step, setStep] = useState<"intro" | "pre-questions" | "creation" | "terminal">("intro");
  const [data, setData] = useState<OnboardingData>({
    nickname: "",
    birthday: "",
    humanAge: "",
    humanGender: "",
    voiceType: "",
    humanName: "",
    autoGenerateName: false,
    lifeAxes: [],
    tenYearGoals: [],
    shortTermGoals: [],
    hobbies: [],
    emotionalHistory: "",
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-background">
      {step === "intro" && (
        <IntroAnimation onComplete={() => setStep("pre-questions")} />
      )}
      {step === "pre-questions" && (
        <PreQuestions
          data={data}
          updateData={updateData}
          onComplete={() => setStep("creation")}
        />
      )}
      {step === "creation" && (
        <HumanCreation
          data={data}
          updateData={updateData}
          onComplete={() => setStep("terminal")}
        />
      )}
      {step === "terminal" && (
        <TerminalAnimation data={data} />
      )}
    </div>
  );
};

export default Onboarding;
