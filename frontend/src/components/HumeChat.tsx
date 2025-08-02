"use client";

import { VoiceProvider } from "@humeai/voice-react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import VoiceControls from "./VoiceControls";
import EmotionDisplay from "./EmotionDisplay";

export default function HumeChat() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch access token from backend
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:3001/api/hume/access-token"
        );
        const data = await response.json();

        if (data.success && data.accessToken) {
          setAccessToken(data.accessToken);
          setError(null);
        } else {
          throw new Error(data.error || "Failed to get access token");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to connect to backend"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Connecting to Hume AI...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Alert variant="destructive">
          <AlertDescription>
            {error}
            <br />
            <br />
            <strong>Setup Instructions:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>
                Create a <code>.env</code> file in the backend folder
              </li>
              <li>
                Add your Hume API credentials:
                <pre className="bg-gray-100 p-2 rounded mt-1 text-xs">
                  {`HUME_API_KEY=your_api_key_here
HUME_SECRET_KEY=your_secret_key_here`}
                </pre>
              </li>
              <li>Restart the backend server</li>
            </ol>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Alert>
          <AlertDescription>No access token available</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Hume AI Voice Chat</h1>
          <p className="text-muted-foreground">
            Real-time emotion detection powered by Hume AI
          </p>
        </div>

        {/* Main Chat Interface */}
        <VoiceProvider
          onMessage={() => {
            // Messages handled in EmotionDisplay component
          }}
          onError={(error) => {
            setError(error.message);
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Voice Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <VoiceControls accessToken={accessToken} />
            </CardContent>
          </Card>

          <EmotionDisplay />
        </VoiceProvider>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Click "Start Call" to begin the voice session</li>
              <li>Speak naturally into your microphone</li>
              <li>Watch real-time emotion analysis appear below</li>
              <li>Use the mute button to toggle your microphone</li>
              <li>Click "End Call" to finish the session</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
