"use client";

import { useVoice } from "@humeai/voice-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function EmotionDisplay() {
  const { messages } = useVoice();

  // Get the latest message with emotion scores
  const getLatestEmotions = () => {
    if (!messages || messages.length === 0) return [];

    // Find the most recent message with prosody scores
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      const scores = (msg as any).models?.prosody?.scores;

      if (scores) {
        console.log("✅ Found prosody scores:", Object.keys(scores).length);

        // Convert scores object to emotions array
        const emotions = Object.entries(scores).map(([name, score]) => ({
          name,
          score: score as number,
        }));

        const topEmotions = emotions
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((e) => `${e.name}: ${(e.score * 100).toFixed(1)}%`)
          .join(", ");

        console.log(`🎭 Emotions detected: ${topEmotions}`);

        return emotions.slice(0, 6);
      }
    }

    return [];
  };

  const emotions = getLatestEmotions();

  if (emotions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Emotion Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Start speaking to see emotion analysis...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Real-time Emotion Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emotions.map((emotion: any, index: number) => (
              <div key={emotion.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{emotion.name}</span>
                  <Badge
                    variant={index === 0 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {(emotion.score * 100).toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={emotion.score * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
