import React from "react";
import { TextEditor } from "@/components/TextEditor";
import { TonePicker } from "@/components/TonePicker";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useApiKey } from "@/hooks/useApiKey";
import { useTextState, useToneState } from "@/hooks/useAppState";
import { useToneAdjustment } from "@/hooks/useToneAdjustment";
import { DEFAULTS, SUCCESS_MESSAGES } from "@/constants";

const Index = () => {
  const { apiKey, setApiKey, hasApiKey } = useApiKey();
  const { originalText, currentText, setCurrentText, resetText } = useTextState(DEFAULTS.TEXT);
  const { selectedTone, setSelectedTone, resetTone } = useToneState();
  
  const { adjustTone, isLoading, error } = useToneAdjustment({
    onSuccess: (adjustedText, tone) => {
      setCurrentText(adjustedText);
    },
  });

  const handleToneSelect = async (tone: string) => {
    setSelectedTone(tone);
    await adjustTone(currentText, tone, apiKey);
  };

  const handleReset = () => {
    resetText();
    resetTone();
  };

  if (!hasApiKey) {
    return (
      <ErrorBoundary>
        <ApiKeyInput onApiKeySet={setApiKey} error={error} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Mistral Tone Craft
            </h1>
            <p className="text-lg text-muted-foreground">
              Adjust your text's tone with the power of Mistral AI
            </p>
          </header>
          
          <main className="flex gap-6 items-start">
            <TextEditor
              originalText={originalText}
              currentText={currentText}
              onTextChange={setCurrentText}
              onReset={handleReset}
              isLoading={isLoading}
            />
            
            <TonePicker
              selectedTone={selectedTone}
              onToneSelect={handleToneSelect}
              onReset={handleReset}
              disabled={isLoading}
            />
          </main>

          <footer className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Powered by{" "}
              <a 
                href="https://mistral.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Mistral AI
              </a>
              {" "}• Built with ❤️ by{" "}
              <a 
                href="https://github.com/Mubashir2611" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Mubashir
              </a>
            </p>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
