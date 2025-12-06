import { useEffect, useState } from "react";
import BehumanLogo from "@/components/BehumanLogo";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"logo" | "text" | "fade">("logo");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("text"), 1200);
    const timer2 = setTimeout(() => setPhase("fade"), 3500);
    const timer3 = setTimeout(() => onComplete(), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-background flex flex-col items-center justify-center transition-opacity duration-700 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo with pulse animation */}
      <div
        className={`transition-all duration-1000 ${
          phase === "logo" ? "scale-100 opacity-100" : "scale-90 opacity-100"
        }`}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl opacity-40">
            <BehumanLogo size={120} className="text-primary" />
          </div>
          <BehumanLogo
            size={120}
            className={`relative z-10 ${phase === "logo" ? "animate-pulse" : ""}`}
          />
        </div>
      </div>

      {/* Text animation */}
      <div
        className={`mt-8 text-center transition-all duration-700 ${
          phase === "text" || phase === "fade"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Vamos a crear a tu
        </h1>
        <span className="text-3xl md:text-4xl font-bold text-primary">
          BeHuman
        </span>
      </div>

      {/* Decorative particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30 animate-pulse"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default IntroAnimation;
