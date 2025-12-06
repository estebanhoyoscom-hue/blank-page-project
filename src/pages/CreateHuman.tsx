import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BehumanLogo from "@/components/BehumanLogo";

const CreateHuman = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"logo" | "transform" | "scan" | "ready">("logo");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("transform"), 1500),
      setTimeout(() => setPhase("scan"), 3000),
      setTimeout(() => setPhase("ready"), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleStart = () => {
    // Navigate to onboarding questions (to be created)
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -200],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo to Human transformation */}
        <div className="relative w-64 h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === "logo" && (
              <motion.div
                key="logo"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute"
              >
                <BehumanLogo size={120} />
              </motion.div>
            )}

            {(phase === "transform" || phase === "scan" || phase === "ready") && (
              <motion.div
                key="human"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute flex flex-col items-center"
              >
                {/* Human silhouette */}
                <svg 
                  viewBox="0 0 100 180" 
                  className="w-32 h-56"
                  fill="none"
                >
                  {/* Body outline */}
                  <motion.path
                    d="M50 20 
                       C65 20 75 30 75 45
                       C75 60 65 70 50 70
                       C35 70 25 60 25 45
                       C25 30 35 20 50 20
                       M50 70
                       L50 120
                       M50 85
                       L25 105
                       M50 85
                       L75 105
                       M50 120
                       L30 170
                       M50 120
                       L70 170"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  
                  {/* Data points */}
                  {phase !== "transform" && (
                    <>
                      {[
                        { cx: 50, cy: 35, delay: 0 },
                        { cx: 50, cy: 85, delay: 0.2 },
                        { cx: 35, cy: 100, delay: 0.4 },
                        { cx: 65, cy: 100, delay: 0.6 },
                        { cx: 40, cy: 145, delay: 0.8 },
                        { cx: 60, cy: 145, delay: 1 },
                      ].map((point, i) => (
                        <motion.circle
                          key={i}
                          cx={point.cx}
                          cy={point.cy}
                          r="4"
                          fill="hsl(var(--primary))"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: point.delay, duration: 0.3 }}
                        />
                      ))}
                    </>
                  )}
                </svg>

                {/* Scanning line */}
                {phase === "scan" && (
                  <motion.div
                    className="absolute w-40 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                    initial={{ top: 0 }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                  />
                )}

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-3xl bg-primary/20"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text content */}
        <motion.div
          className="text-center mt-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {phase === "logo" && (
              <motion.p
                key="init"
                className="text-muted-foreground text-lg"
                exit={{ opacity: 0 }}
              >
                Iniciando...
              </motion.p>
            )}
            {phase === "transform" && (
              <motion.p
                key="creating"
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Preparando tu Human...
              </motion.p>
            )}
            {phase === "scan" && (
              <motion.p
                key="scanning"
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Analizando parámetros...
              </motion.p>
            )}
            {phase === "ready" && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    Tu Human está listo
                  </h1>
                  <p className="text-muted-foreground">
                    Vamos a crear tu versión digital
                  </p>
                </div>
                
                <Button 
                  onClick={handleStart}
                  size="lg"
                  className="w-full max-w-xs h-14 text-lg font-medium"
                >
                  Comenzar
                </Button>

                {/* Skip animation hint */}
                <p className="text-xs text-muted-foreground/60">
                  Solo tomará unos minutos
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress dots */}
        <motion.div 
          className="flex gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {["logo", "transform", "scan", "ready"].map((p, i) => (
            <motion.div
              key={p}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                ["logo", "transform", "scan", "ready"].indexOf(phase) >= i 
                  ? "bg-primary" 
                  : "bg-muted"
              }`}
              animate={phase === p ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CreateHuman;
