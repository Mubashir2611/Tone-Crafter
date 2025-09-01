import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TonePickerProps } from "@/types";
import { TONE_MATRIX } from "@/constants";

export function TonePicker({ 
  selectedTone, 
  onToneSelect, 
  onReset,
  disabled = false,
  tones = TONE_MATRIX.flat()
}: TonePickerProps) {
  
  const handleToneSelect = useCallback((toneId: string) => {
    if (!disabled) {
      onToneSelect(toneId);
    }
  }, [disabled, onToneSelect]);

  const handleReset = useCallback(() => {
    if (!disabled) {
      onReset();
    }
  }, [disabled, onReset]);

  const selectedToneData = tones.find(tone => tone.id === selectedTone);

  return (
    <div className="w-80 p-6 bg-card rounded-lg border shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-1">Tone Picker</h2>
        <div className="min-h-[2.5rem]">
          {selectedToneData ? (
            <div>
              <p className="text-sm font-medium text-primary capitalize">
                {selectedToneData.label}
              </p>
              {selectedToneData.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedToneData.description}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a tone
            </p>
          )}
        </div>
      </div>
      
      <TooltipProvider>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {TONE_MATRIX.map((row, rowIndex) => 
            row.map((tone) => (
              <Tooltip key={tone.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleToneSelect(tone.id)}
                    disabled={disabled}
                    className={cn(
                      "w-16 h-16 rounded-full border-2 transition-all duration-200",
                      "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                      selectedTone === tone.id
                        ? "bg-primary border-primary text-primary-foreground shadow-md"
                        : "bg-secondary border-border hover:border-muted-foreground"
                    )}
                    aria-label={`Select ${tone.label} tone`}
                    aria-pressed={selectedTone === tone.id ? "true" : "false"}
                  >
                    <span className="sr-only">{tone.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="text-center">
                    <p className="font-medium">{tone.label}</p>
                    {tone.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {tone.description}
                      </p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))
          )}
        </div>
      </TooltipProvider>

      <div className="text-center text-xs text-muted-foreground mb-4 space-y-1">
        <div className="flex justify-between">
          <span>Professional</span>
          <span>Formal</span>
        </div>
        <div className="flex justify-between">
          <span>Friendly</span>
          <span>Playful</span>
        </div>
        <div className="flex justify-between">
          <span>Creative</span>
          <span>Confident</span>
        </div>
      </div>
      
      <Button 
        variant="secondary" 
        className="w-full"
        onClick={handleReset}
        disabled={disabled}
      >
        ↻ Reset to Original
      </Button>
    </div>
  );
}