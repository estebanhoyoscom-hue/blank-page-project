import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { OnboardingData } from "@/pages/Onboarding";
import BehumanLogo from "@/components/BehumanLogo";

interface TerminalAnimationProps {
  data: OnboardingData;
}

const TerminalAnimation = ({ data }: TerminalAnimationProps) => {
  const navigate = useNavigate();
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const humanName = data.autoGenerateName ? "Nova" : data.humanName || "Human";

  const terminalLines = [
    "> Iniciando protocolo BeHuman...",
    "> Conectando con la matriz de personalidad...",
    `> Usuario identificado: ${data.nickname}`,
    "> Analizando preferencias...",
    `> Edad del Human: ${data.humanAge}`,
    `> Identidad: ${data.humanGender}`,
    `> Perfil de voz: ${data.voiceType}`,
    "> Cargando ejes de vida...",
    ...data.lifeAxes.map((axis) => `  └─ ${axis}`),
    "> Procesando objetivos a largo plazo...",
    ...data.tenYearGoals.slice(0, 3).map((goal) => `  └─ ${goal}`),
    "> Sincronizando hobbies...",
    ...data.hobbies.slice(0, 3).map((hobby) => `  └─ ${hobby}`),
    "> Compilando historia emocional...",
    "> Generando conexión neuronal...",
    "> ████████████████████ 100%",
    "",
    `> ✓ ${humanName} ha sido creado exitosamente.`,
    "> Bienvenido a BeHuman.",
  ];

  useEffect(() => {
    if (currentLineIndex < terminalLines.length) {
      const delay = terminalLines[currentLineIndex].startsWith("  └─")
        ? 150
        : terminalLines[currentLineIndex].includes("████")
        ? 800
        : 400;

      const timer = setTimeout(() => {
        setLines((prev) => [...prev, terminalLines[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsComplete(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, terminalLines.length]);

  const handleContinue = () => {
    // Navigate to home or dashboard
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-foreground flex flex-col">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-foreground/90 border-b border-primary/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-xs text-primary/70 font-mono">
          behuman_terminal
        </span>
      </div>

      {/* Terminal content */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {/* Logo at top */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary/20">
          <BehumanLogo size={32} />
          <span className="text-primary font-bold text-lg">BeHuman</span>
        </div>

        {/* Terminal lines */}
        <div className="space-y-1">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`${
                line.startsWith(">")
                  ? line.includes("✓")
                    ? "text-green-400"
                    : "text-primary"
                  : line.startsWith("  └─")
                  ? "text-primary/60"
                  : "text-primary/40"
              } ${line.includes("████") ? "text-green-400" : ""}`}
            >
              {line}
            </div>
          ))}

          {/* Blinking cursor */}
          {!isComplete && (
            <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
          )}
        </div>
      </div>

      {/* Continue button */}
      {isComplete && (
        <div className="p-6 animate-fade-in">
          <button
            onClick={handleContinue}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Comenzar mi viaje
          </button>
        </div>
      )}
    </div>
  );
};

export default TerminalAnimation;
