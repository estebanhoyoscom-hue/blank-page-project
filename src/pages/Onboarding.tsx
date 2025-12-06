import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BehumanLogo from "@/components/BehumanLogo";
import OnboardingIntro from "@/components/onboarding/OnboardingIntro";
import OnboardingComplete from "@/components/onboarding/OnboardingComplete";
import OnboardingOption from "@/components/onboarding/OnboardingOption";
import { ArrowLeft, ArrowRight } from "lucide-react";

type OnboardingPhase = "intro" | "questions" | "complete";

const Onboarding = () => {
  const [phase, setPhase] = useState<OnboardingPhase>("intro");
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data
  const [humanAge, setHumanAge] = useState("");
  const [humanGender, setHumanGender] = useState("");
  const [humanName, setHumanName] = useState("");
  const [lifeAxes, setLifeAxes] = useState<string[]>([]);
  const [tenYearGoals, setTenYearGoals] = useState<string[]>([]);
  const [shortTermGoals, setShortTermGoals] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [emotionalHistory, setEmotionalHistory] = useState("");

  const totalSteps = 8;

  const handleMultiSelect = (
    value: string,
    selected: string[],
    setSelected: (val: string[]) => void,
    maxItems?: number
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else if (!maxItems || selected.length < maxItems) {
      setSelected([...selected, value]);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setPhase("complete");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Escoge la edad de tu Human</h2>
              <p className="text-muted-foreground">Define la personalidad y energía de tu Human</p>
            </div>
            <div className="grid gap-3">
              {["18–22 años", "23–28 años", "29–35 años", "36–45 años", "46–55 años", "55+ años"].map((age) => (
                <OnboardingOption
                  key={age}
                  label={age}
                  selected={humanAge === age}
                  onClick={() => setHumanAge(age)}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">¿Cómo quieres que se identifique tu Human?</h2>
            </div>
            <div className="grid gap-3">
              {["Masculino", "Femenino", "No binario"].map((gender) => (
                <OnboardingOption
                  key={gender}
                  label={gender}
                  selected={humanGender === gender}
                  onClick={() => setHumanGender(gender)}
                />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Nombre del Human</h2>
              <p className="text-muted-foreground">Dale un nombre único a tu Human</p>
            </div>
            <Input
              value={humanName}
              onChange={(e) => setHumanName(e.target.value)}
              placeholder="Escribe un nombre..."
              className="text-lg py-6"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">¿Cuáles son tus ejes centrales en la vida?</h2>
              <p className="text-muted-foreground">Selecciona máximo 3</p>
            </div>
            <div className="grid gap-3">
              {[
                "Familia", "Trabajo / carrera", "Dinero / estabilidad financiera",
                "Diversión / disfrute", "Salud física / mental", "Conexiones sociales / amigos",
                "Espiritualidad / sentido de vida", "Impacto en el mundo / ayudar a otros"
              ].map((axis) => (
                <OnboardingOption
                  key={axis}
                  label={axis}
                  selected={lifeAxes.includes(axis)}
                  onClick={() => handleMultiSelect(axis, lifeAxes, setLifeAxes, 3)}
                  multiSelect
                />
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">En 10 años, ¿qué te gustaría haber logrado?</h2>
              <p className="text-muted-foreground">Puedes elegir varios</p>
            </div>
            <div className="grid gap-3 max-h-[50vh] overflow-y-auto pr-2">
              {[
                "Tener mi propia empresa", "Estar financieramente estable", "Formar una familia",
                "Tener 1 o varios hijos", "Haber viajado por el mundo", "Tener excelente salud física",
                "Tener estabilidad emocional", "Vivir en otro país", "Convertirme en líder en mi área",
                "Tener propiedades o inversiones", "Haber creado algo que impacte a otros"
              ].map((goal) => (
                <OnboardingOption
                  key={goal}
                  label={goal}
                  selected={tenYearGoals.includes(goal)}
                  onClick={() => handleMultiSelect(goal, tenYearGoals, setTenYearGoals)}
                  multiSelect
                />
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">¿Cuáles son tus objetivos a corto plazo?</h2>
              <p className="text-muted-foreground">Selecciona hasta 3 (menos de 1 año)</p>
            </div>
            <div className="grid gap-3 max-h-[50vh] overflow-y-auto pr-2">
              {[
                "Conseguir pareja o mejorar mi vida sentimental", "Aumentar mi salario",
                "Empezar a emprender", "Mejorar mi forma física", "Irme a vivir solo",
                "Cambiar de empleo", "Construir hábitos saludables",
                "Sanar emocionalmente / trabajar en terapia", "Ahorrar dinero o empezar a invertir",
                "Viajar más", "Expandir mi círculo social",
                "Mejorar habilidades profesionales (inglés, IA, programación, etc.)"
              ].map((goal) => (
                <OnboardingOption
                  key={goal}
                  label={goal}
                  selected={shortTermGoals.includes(goal)}
                  onClick={() => handleMultiSelect(goal, shortTermGoals, setShortTermGoals, 3)}
                  multiSelect
                />
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">¿Cuáles son tus hobbies favoritos?</h2>
              <p className="text-muted-foreground">Selecciona máximo 5</p>
            </div>
            <div className="grid gap-3 max-h-[50vh] overflow-y-auto pr-2">
              {[
                "Salir de fiesta", "Leer libros", "Escuchar música", "Hacer ejercicio / gimnasio",
                "Correr / trotar", "Caminar largos trayectos", "Bailar", "Viajar", "Cocinar",
                "Ver series o películas", "Jugar videojuegos", "Meditar", "Pintar / dibujar",
                "Escribir", "Fotografiar", "Programar / proyectos personales", "Aprender temas nuevos",
                "Emprender / crear ideas", "Salir con amigos", "Citas / conocer gente",
                "Senderismo / naturaleza", "Deportes en equipo", "Deportes extremos",
                "Jardinería / plantas", "Tocar instrumentos", "Podcasts", "Juegos de mesa",
                "Yoga / pilates", "Voluntariado / ayudar a otros", "Diseño / manualidades",
                "Coleccionar cosas", "Crear contenido (videos, TikTok, etc.)"
              ].map((hobby) => (
                <OnboardingOption
                  key={hobby}
                  label={hobby}
                  selected={hobbies.includes(hobby)}
                  onClick={() => handleMultiSelect(hobby, hobbies, setHobbies, 5)}
                  multiSelect
                />
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">¿Qué te gustaría que tu Human conozca sobre tu historia emocional?</h2>
              <p className="text-muted-foreground">Esto es opcional pero ayuda a personalizar tu experiencia</p>
            </div>
            <Textarea
              value={emotionalHistory}
              onChange={(e) => setEmotionalHistory(e.target.value)}
              placeholder="Comparte lo que quieras..."
              className="min-h-[200px] text-base"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return humanAge.length > 0;
      case 2: return humanGender.length > 0;
      case 3: return humanName.trim().length > 0;
      case 4: return lifeAxes.length > 0 && lifeAxes.length <= 3;
      case 5: return tenYearGoals.length > 0;
      case 6: return shortTermGoals.length > 0 && shortTermGoals.length <= 3;
      case 7: return hobbies.length > 0 && hobbies.length <= 5;
      case 8: return true; // Optional
      default: return false;
    }
  };

  if (phase === "intro") {
    return <OnboardingIntro onComplete={() => setPhase("questions")} />;
  }

  if (phase === "complete") {
    return <OnboardingComplete humanName={humanName} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Content */}
      <main className="flex-1 px-4 py-8 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <BehumanLogo size={48} />
          </div>
          
          {/* Step content */}
          <div className="animate-fade-in">
            {renderStep()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-4">
        <div className="max-w-lg mx-auto flex gap-3">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 py-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Atrás
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 py-6"
          >
            {currentStep === totalSteps ? "Finalizar" : "Continuar"}
            {currentStep !== totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
