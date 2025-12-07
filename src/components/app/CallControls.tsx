import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CallState = "idle" | "connecting" | "in-call" | "ending";

interface CallControlsProps {
  callState: CallState;
  isMuted: boolean;
  isCameraOn: boolean;
  onCall: () => void;
  onHangUp: () => void;
  onToggleMute: () => void;
  onToggleCamera: () => void;
}

const CallControls = ({
  callState,
  isMuted,
  isCameraOn,
  onCall,
  onHangUp,
  onToggleMute,
  onToggleCamera,
}: CallControlsProps) => {
  const isInCall = callState === "in-call" || callState === "connecting";

  return (
    <div className="flex items-center justify-center p-4">
      {/* Call/Hang up button */}
      {isInCall ? (
        <Button
          size="icon"
          className="w-20 h-20 rounded-full bg-destructive hover:bg-destructive/90 shadow-lg shadow-destructive/30"
          onClick={onHangUp}
        >
          <PhoneOff className="w-8 h-8" />
        </Button>
      ) : (
        <Button
          size="icon"
          className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 animate-pulse"
          onClick={onCall}
        >
          <Phone className="w-8 h-8" />
        </Button>
      )}
    </div>
  );
};

export default CallControls;
