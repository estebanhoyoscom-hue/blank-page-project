import { useState, useEffect, useCallback } from "react";
import { Menu, Phone, ClipboardList } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import HumanAvatar from "@/components/app/HumanAvatar";
import CallControls from "@/components/app/CallControls";
import CallStatus from "@/components/app/CallStatus";
import AssessmentPanel from "@/components/assessment/AssessmentPanel";

type CallState = "idle" | "connecting" | "in-call" | "ending";

const AppHome = () => {
  const [callState, setCallState] = useState<CallState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [humanName, setHumanName] = useState("Human");
  const [humanGender, setHumanGender] = useState("neutral");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    dragFree: false,
  });

  // Load human data from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("humanName");
    const storedGender = localStorage.getItem("humanGender");
    if (storedName) setHumanName(storedName);
    if (storedGender) setHumanGender(storedGender);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const handleCall = () => {
    setCallState("connecting");
    setTimeout(() => {
      setCallState("in-call");
    }, 2000);
  };

  const handleHangUp = () => {
    setCallState("ending");
    setTimeout(() => {
      setCallState("idle");
    }, 1000);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header - Desktop shows tabs, mobile shows dots */}
      <header className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Desktop tabs */}
        <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-full p-1">
          <button
            onClick={() => scrollTo(0)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
              ${selectedIndex === 0 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <Phone className="w-4 h-4" />
            <span>Llamada</span>
          </button>
          <button
            onClick={() => scrollTo(1)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
              ${selectedIndex === 1 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Check-in</span>
          </button>
        </div>

        {/* Mobile indicator dots */}
        <div className="flex md:hidden items-center gap-2">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                selectedIndex === index 
                  ? 'bg-primary w-6' 
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        <div className="w-10" />
      </header>

      {/* Swipeable content */}
      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {/* Panel 1: Call view */}
          <div className="flex-[0_0_100%] min-w-0 h-full flex flex-col">
            <div className="px-4 flex justify-center">
              <CallStatus humanName={humanName} callState={callState} />
            </div>
            
            <main className="flex-1 flex flex-col items-center justify-center px-4 pb-4">
              <div className="relative w-full max-w-sm">
                <HumanAvatar state={callState} gender={humanGender} />
              </div>
            </main>

            <footer className="pb-8 pt-4">
              <CallControls
                callState={callState}
                isMuted={isMuted}
                isCameraOn={isCameraOn}
                onCall={handleCall}
                onHangUp={handleHangUp}
                onToggleMute={handleToggleMute}
                onToggleCamera={handleToggleCamera}
              />
            </footer>
          </div>

          {/* Panel 2: Assessment view */}
          <div className="flex-[0_0_100%] min-w-0 h-full overflow-y-auto">
            <AssessmentPanel />
          </div>
        </div>
      </div>

      {/* Bottom swipe hint for mobile */}
      <div className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/50 flex items-center gap-1">
        <span>←</span>
        <span>Desliza</span>
        <span>→</span>
      </div>
    </div>
  );
};

export default AppHome;
