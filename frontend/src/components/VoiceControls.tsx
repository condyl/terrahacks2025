"use client";

import { useVoice } from "@humeai/voice-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Phone, PhoneCall } from "lucide-react";

interface VoiceControlsProps {
  accessToken: string;
}

export default function VoiceControls({ accessToken }: VoiceControlsProps) {
  const { status, connect, disconnect, isMuted, mute, unmute, micFft } =
    useVoice();

  const handleConnect = async () => {
    try {
      await connect({
        auth: { type: "accessToken", value: accessToken },
        // You can add configId here if you have one
        // configId: "your-config-id"
      });
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const toggleMute = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <Badge
            variant={status.value === "connected" ? "default" : "secondary"}
            className="flex items-center gap-1"
          >
            {status.value === "connected" ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Connected
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                {status.value}
              </>
            )}
          </Badge>
        </div>

        {/* Microphone Level Indicator */}
        {status.value === "connected" && micFft && (
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 10 }, (_, i) => {
                const level = Math.max(...Array.from(micFft)) * 10;
                return (
                  <div
                    key={i}
                    className={`w-1 h-4 rounded-full ${
                      i < level ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4">
        {status.value === "connected" ? (
          <>
            {/* Mute/Unmute Button */}
            <Button
              onClick={toggleMute}
              variant={isMuted ? "destructive" : "default"}
              size="lg"
              className="flex items-center gap-2"
            >
              {isMuted ? (
                <>
                  <MicOff className="w-5 h-5" />
                  Muted
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  Recording
                </>
              )}
            </Button>

            {/* Disconnect Button */}
            <Button
              onClick={handleDisconnect}
              variant="destructive"
              size="lg"
              className="flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              End Call
            </Button>
          </>
        ) : (
          /* Connect Button */
          <Button
            onClick={handleConnect}
            size="lg"
            className="flex items-center gap-2"
            disabled={status.value === "connecting"}
          >
            <PhoneCall className="w-5 h-5" />
            {status.value === "connecting" ? "Connecting..." : "Start Call"}
          </Button>
        )}
      </div>
    </div>
  );
}
