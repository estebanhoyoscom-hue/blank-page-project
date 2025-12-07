import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HumanAvatar from "@/components/app/HumanAvatar";
import CallControls from "@/components/app/CallControls";
import CallStatus from "@/components/app/CallStatus";
import TranscriptionOverlay from "@/components/app/TranscriptionOverlay";
import UserVideoPreview from "@/components/app/UserVideoPreview";

type CallState = "idle" | "connecting" | "in-call" | "ending";

const AppHome = () => {
  const navigate = useNavigate();
  const [callState, setCallState] = useState<CallState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [transcription, setTranscription] = useState("");
  const [humanName, setHumanName] = useState("Human");
  const [humanGender, setHumanGender] = useState("neutral");

  // Load human data from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("humanName");
    const storedGender = localStorage.getItem("humanGender");
    if (storedName) setHumanName(storedName);
    if (storedGender) setHumanGender(storedGender);
  }, []);

  const handleCall = () => {
    setCallState("connecting");
    // Simulate connection delay
    setTimeout(() => {
      setCallState("in-call");
    }, 2000);
  };

  const handleHangUp = () => {
    setCallState("ending");
    setTranscription("");
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-muted-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <CallStatus 
          humanName={humanName} 
          callState={callState} 
        />
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-4 relative">
        {/* Avatar area */}
        <div className="relative w-full max-w-sm">
          <HumanAvatar 
            state={callState} 
            gender={humanGender}
          />
        </div>
      </main>

      {/* Call controls */}
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
  );
};

export default AppHome;
