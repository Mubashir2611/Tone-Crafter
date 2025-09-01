import React, { useCallback, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RotateCcw, RefreshCw, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { TextEditorProps } from "@/types";

export function TextEditor({ 
  originalText, 
  currentText, 
  onTextChange, 
  onReset,
  isLoading = false,
  disabled = false
}: TextEditorProps) {
  const [copied, setCopied] = React.useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      toast({
        title: "Text copied",
        description: "Text has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed", 
        description: "Failed to copy text to clipboard",
        variant: "destructive",
      });
    }
  }, [currentText, toast]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  }, [onTextChange]);

  const handleReset = useCallback(() => {
    onReset();
    toast({
      title: "Text reset",
      description: "Text has been reset to original",
    });
  }, [onReset, toast]);

  const wordCount = currentText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = currentText.length;
  const hasChanges = originalText !== currentText;

  return (
    <div className="flex-1 p-6 bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Your Text</h2>
          <p className="text-sm text-muted-foreground">
            {wordCount} words, {charCount} characters
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={!currentText.trim() || isLoading}
            className="text-muted-foreground hover:text-foreground"
            title="Copy text"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={!hasChanges || isLoading}
            className="text-muted-foreground hover:text-foreground"
            title="Reset to original"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            disabled={isLoading}
            className="text-muted-foreground hover:text-foreground"
            title={isLoading ? "Processing..." : "Refresh"}
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={currentText}
          onChange={handleTextChange}
          placeholder="Enter your text here..."
          className={cn(
            "min-h-[300px] text-base leading-relaxed resize-none",
            "focus:ring-2 focus:ring-primary/20 transition-all",
            isLoading && "opacity-50"
          )}
          disabled={isLoading || disabled}
          aria-label="Text to adjust tone"
          aria-describedby="text-stats"
        />
        
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Adjusting tone with AI...
            </div>
          </div>
        )}
      </div>

      <div id="text-stats" className="mt-2 text-xs text-muted-foreground">
        {hasChanges && (
          <span className="text-primary">• Text has been modified</span>
        )}
      </div>
    </div>
  );
}