import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Key, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApiKeyInputProps } from "@/types";

export function ApiKeyInput({ onApiKeySet, isLoading = false, error }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedKey = apiKey.trim();
    if (trimmedKey) {
      onApiKeySet(trimmedKey);
    }
  }, [apiKey, onApiKeySet]);

  const handleKeyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  }, []);

  const toggleShowKey = useCallback(() => {
    setShowKey(prev => !prev);
  }, []);

  const isValidKey = apiKey.trim().length > 0;
  const keyPattern = /^[a-zA-Z0-9_-]+$/; // Basic pattern for API keys
  const hasValidFormat = keyPattern.test(apiKey.trim()) || apiKey.trim().length === 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Key className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Mistral API Key Required</h1>
          <p className="text-muted-foreground text-sm">
            Enter your Mistral API key to start using Mistral Tone Craft
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showKey ? "text" : "password"}
              placeholder="Enter your Mistral API key"
              value={apiKey}
              onChange={handleKeyChange}
              className={cn(
                "pr-10",
                !hasValidFormat && apiKey.trim().length > 0 && "border-destructive focus:border-destructive"
              )}
              disabled={isLoading}
              aria-describedby="key-help"
              autoComplete="off"
              spellCheck={false}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={toggleShowKey}
              disabled={isLoading}
              aria-label={showKey ? "Hide API key" : "Show API key"}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>

          {!hasValidFormat && apiKey.trim().length > 0 && (
            <p className="text-sm text-destructive">
              Please enter a valid API key format
            </p>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isValidKey || !hasValidFormat || isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Validating...
              </>
            ) : (
              "Start Using Tool"
            )}
          </Button>
          
          <div id="key-help" className="text-xs text-muted-foreground text-center space-y-1">
            <p>Your API key is stored locally and never sent to our servers</p>
            <p>
              Don't have an API key?{" "}
              <a 
                href="https://console.mistral.ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Get one from Mistral AI
              </a>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}