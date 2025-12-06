import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import type { OnboardingData } from "@/pages/Onboarding";
import BehumanLogo from "@/components/BehumanLogo";

interface HumanCreationProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

const HumanCreation = ({ data, updateData, onComplete }: HumanCreationProps) => {
  const [step, setStep] = useState(-1); // -1 is the creation animation
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
        setStep(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const totalSteps = 9;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const toggleArrayItem = (
    key: keyof OnboardingData,
    value: string,
    maxItems?: number
  ) => {
    const currentArray = data[key] as string[];
    if (currentArray.includes(value)) {
      updateData({ [key]: currentArray.filter((item) => item !== value) });
    } else if (!maxItems || currentArray.length < maxItems) {
      updateData({ [key]: [...currentArray, value] });
    }
  };

  const isNextDisabled = () => {
    switch (step) {
      case 0:
        return !data.humanAge;
      case 1:
        return !data.humanGender;
      case 2:
        return !data.voiceType;
      case 3:
        return !data.humanName && !data.autoGenerateName;
      case 4:
        return data.lifeAxes.length === 0;
      case 5:
        return data.tenYearGoals.length === 0;
      case 6:
        return data.shortTermGoals.length === 0;
      case 7:
        return data.hobbies.length === 0;
      default:
        return false;
    }
  };

  // Creation animation
  if (showAnimation) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center">
        <div className="relative">
          {/* Pulsing rings */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: "2s",
              }}
            />
          ))}
          <div className="relative z-10 p-8">
            <BehumanLogo size={100} className="animate-pulse" />
          </div>
        </div>
        <h2 className="mt-8 text-xl font-bold text-foreground animate-pulse">
          Creando tu Human...
        </h2>
        <div className="mt-4 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const ageOptions = [
    "18–22 años",
    "23–28 años",
    "29–35 años",
    "36–45 años",
    "46–55 años",
    "55+ años",
  ];

  const genderOptions = ["Masculino", "Femenino", "No binario"];

  const voiceOptions = [
    "Voz suave",
    "Voz energética",
    "Voz madura",
    "Voz neutral",
    "Prefiero que la app elija",
  ];

  const lifeAxesOptions = [
    "Familia",
    "Trabajo / carrera",
    "Dinero / estabilidad financiera",
    "Diversión / disfrute",
    "Salud física / mental",
    "Conexiones sociales / amigos",
    "Espiritualidad / sentido de vida",
    "Impacto en el mundo / ayudar a otros",
  ];

  const tenYearGoalsOptions = [
    "Tener mi propia empresa",
    "Estar financieramente estable",
    "Formar una familia",
    "Tener 1 o varios hijos",
    "Haber viajado por el mundo",
    "Tener excelente salud física",
    "Tener estabilidad emocional",
    "Vivir en otro país",
    "Convertirme en líder en mi área",
    "Tener propiedades o inversiones",
    "Haber creado algo que impacte a otros",
  ];

  const shortTermGoalsOptions = [
    "Conseguir pareja o mejorar mi vida sentimental",
    "Aumentar mi salario",
    "Empezar a emprender",
    "Mejorar mi forma física",
    "Irme a vivir solo",
    "Cambiar de empleo",
    "Construir hábitos saludables",
    "Sanar emocionalmente / trabajar en terapia",
    "Ahorrar dinero o empezar a invertir",
    "Viajar más",
    "Expandir mi círculo social",
    "Mejorar habilidades profesionales",
  ];

  const hobbiesOptions = [
    "Salir de fiesta",
    "Leer libros",
    "Escuchar música",
    "Hacer ejercicio / gimnasio",
    "Correr / trotar",
    "Caminar largos trayectos",
    "Bailar",
    "Viajar",
    "Cocinar",
    "Ver series o películas",
    "Jugar videojuegos",
    "Meditar",
    "Pintar / dibujar",
    "Escribir",
    "Fotografiar",
    "Programar",
    "Aprender temas nuevos",
    "Emprender / crear ideas",
    "Salir con amigos",
    "Citas / conocer gente",
    "Senderismo / naturaleza",
    "Deportes en equipo",
    "Deportes extremos",
    "Jardinería / plantas",
    "Tocar instrumentos",
    "Podcasts",
    "Juegos de mesa",
    "Yoga / pilates",
    "Voluntariado",
    "Diseño / manualidades",
    "Coleccionar cosas",
    "Crear contenido",
  ];

  const renderOptionButton = (
    option: string,
    isSelected: boolean,
    onClick: () => void
  ) => (
    <button
      key={option}
      onClick={onClick}
      className={`p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
        isSelected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/50"
      }`}
    >
      {option}
    </button>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Progress bar */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="flex gap-1">
          {[...Array(totalSteps)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {step + 1} de {totalSteps}
        </p>
      </div>

      <div className="flex-1 w-full max-w-md mx-auto overflow-y-auto">
        <div className="animate-fade-in space-y-4">
          {/* Step 0: Age */}
          {step === 0 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Escoge la edad de tu Human
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {ageOptions.map((option) =>
                  renderOptionButton(option, data.humanAge === option, () =>
                    updateData({ humanAge: option })
                  )
                )}
              </div>
            </>
          )}

          {/* Step 1: Gender */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-4">
                ¿Cómo quieres que se identifique tu Human?
              </h2>
              <div className="grid gap-3">
                {genderOptions.map((option) =>
                  renderOptionButton(option, data.humanGender === option, () =>
                    updateData({ humanGender: option })
                  )
                )}
              </div>
            </>
          )}

          {/* Step 2: Voice */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-4">
                ¿Qué tipo de voz prefieres escuchar?
              </h2>
              <div className="grid gap-3">
                {voiceOptions.map((option) =>
                  renderOptionButton(option, data.voiceType === option, () =>
                    updateData({ voiceType: option })
                  )
                )}
              </div>
            </>
          )}

          {/* Step 3: Human Name */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Nombre del Human
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="humanName">Escribe un nombre</Label>
                  <Input
                    id="humanName"
                    type="text"
                    placeholder="Nombre de tu Human..."
                    value={data.humanName}
                    onChange={(e) =>
                      updateData({ humanName: e.target.value, autoGenerateName: false })
                    }
                    disabled={data.autoGenerateName}
                    className="h-12"
                  />
                </div>
                <div className="text-center text-muted-foreground">o</div>
                <button
                  onClick={() =>
                    updateData({ autoGenerateName: !data.autoGenerateName, humanName: "" })
                  }
                  className={`w-full p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                    data.autoGenerateName
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <Sparkles className="h-5 w-5" />
                  Generar automáticamente un nombre
                </button>
              </div>
            </>
          )}

          {/* Step 4: Life Axes */}
          {step === 4 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-2">
                ¿Cuáles son tus ejes centrales en la vida?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Selecciona máximo 3
              </p>
              <div className="grid gap-3">
                {lifeAxesOptions.map((option) =>
                  renderOptionButton(
                    option,
                    data.lifeAxes.includes(option),
                    () => toggleArrayItem("lifeAxes", option, 3)
                  )
                )}
              </div>
            </>
          )}

          {/* Step 5: 10 Year Goals */}
          {step === 5 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-2">
                En 10 años, ¿qué te gustaría haber logrado?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Puedes elegir varios
              </p>
              <div className="grid gap-3">
                {tenYearGoalsOptions.map((option) =>
                  renderOptionButton(
                    option,
                    data.tenYearGoals.includes(option),
                    () => toggleArrayItem("tenYearGoals", option)
                  )
                )}
              </div>
            </>
          )}

          {/* Step 6: Short Term Goals */}
          {step === 6 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-2">
                ¿Cuáles son tus tres objetivos principales a corto plazo?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Selecciona hasta 3 (menos de 1 año)
              </p>
              <div className="grid gap-3">
                {shortTermGoalsOptions.map((option) =>
                  renderOptionButton(
                    option,
                    data.shortTermGoals.includes(option),
                    () => toggleArrayItem("shortTermGoals", option, 3)
                  )
                )}
              </div>
            </>
          )}

          {/* Step 7: Hobbies */}
          {step === 7 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-2">
                ¿Cuáles son tus hobbies o actividades favoritas?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Selecciona máximo 5
              </p>
              <div className="grid grid-cols-2 gap-2">
                {hobbiesOptions.map((option) =>
                  renderOptionButton(
                    option,
                    data.hobbies.includes(option),
                    () => toggleArrayItem("hobbies", option, 5)
                  )
                )}
              </div>
            </>
          )}

          {/* Step 8: Emotional History */}
          {step === 8 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-2">
                ¿Qué te gustaría que tu Human conozca sobre tu historia
                emocional?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Este espacio es seguro y privado
              </p>
              <Textarea
                placeholder="Cuéntanos lo que quieras compartir..."
                value={data.emotionalHistory}
                onChange={(e) => updateData({ emotionalHistory: e.target.value })}
                className="min-h-[200px] resize-none"
              />
            </>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="w-full max-w-md mx-auto pt-6 flex gap-3">
        {step > 0 && (
          <Button variant="outline" onClick={handleBack} className="h-12">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={isNextDisabled()}
          className="flex-1 h-12 text-base font-semibold"
        >
          {step === totalSteps - 1 ? "Finalizar" : "Continuar"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HumanCreation;
