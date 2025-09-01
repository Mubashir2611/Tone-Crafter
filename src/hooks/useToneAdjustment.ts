import { useState, useCallback } from 'react';
import { mistralApi } from '@/services/mistralApi';
import { ApiResponse } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { SUCCESS_MESSAGES } from '@/constants';

interface UseToneAdjustmentOptions {
  onSuccess?: (adjustedText: string, tone: string) => void;
  onError?: (error: string) => void;
}

interface UseToneAdjustmentReturn {
  adjustTone: (text: string, tone: string, apiKey: string) => Promise<string | null>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * Custom hook for handling tone adjustment functionality
 */
export function useToneAdjustment(options: UseToneAdjustmentOptions = {}): UseToneAdjustmentReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const adjustTone = useCallback(async (
    text: string, 
    tone: string, 
    apiKey: string
  ): Promise<string | null> => {
    if (!text.trim()) {
      const errorMsg = 'No text to adjust';
      setError(errorMsg);
      options.onError?.(errorMsg);
      toast({
        title: "No text to adjust",
        description: "Please enter some text first.",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response: ApiResponse<string> = await mistralApi.adjustTone(
        { text, tone },
        apiKey
      );

      if (response.status === 'success' && response.data) {
        options.onSuccess?.(response.data, tone);
        toast({
          title: "Tone adjusted successfully",
          description: SUCCESS_MESSAGES.TONE_ADJUSTED(tone),
        });
        return response.data;
      } else {
        const errorMsg = response.error || 'Failed to adjust tone';
        setError(errorMsg);
        options.onError?.(errorMsg);
        toast({
          title: "Error adjusting tone",
          description: errorMsg,
          variant: "destructive",
        });
        return null;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMsg);
      options.onError?.(errorMsg);
      toast({
        title: "Error adjusting tone",
        description: errorMsg,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [options, toast]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    adjustTone,
    isLoading,
    error,
    clearError,
  };
}
