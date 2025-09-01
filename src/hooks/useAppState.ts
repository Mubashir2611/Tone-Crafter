import { useState, useCallback } from 'react';
import { DEFAULTS, STORAGE_KEYS } from '@/constants';

interface UseTextStateReturn {
  originalText: string;
  currentText: string;
  setOriginalText: (text: string) => void;
  setCurrentText: (text: string) => void;
  resetText: () => void;
  hasChanges: boolean;
}

/**
 * Custom hook for managing text state (original and current)
 */
export function useTextState(initialText: string = DEFAULTS.TEXT): UseTextStateReturn {
  const [originalText, setOriginalTextState] = useState(initialText);
  const [currentText, setCurrentTextState] = useState(initialText);

  const setOriginalText = useCallback((text: string) => {
    setOriginalTextState(text);
    setCurrentTextState(text);
  }, []);

  const setCurrentText = useCallback((text: string) => {
    setCurrentTextState(text);
  }, []);

  const resetText = useCallback(() => {
    setCurrentTextState(originalText);
  }, [originalText]);

  const hasChanges = originalText !== currentText;

  return {
    originalText,
    currentText,
    setOriginalText,
    setCurrentText,
    resetText,
    hasChanges,
  };
}

interface UseToneStateReturn {
  selectedTone: string;
  setSelectedTone: (tone: string) => void;
  resetTone: () => void;
}

/**
 * Custom hook for managing tone selection state
 */
export function useToneState(initialTone: string = DEFAULTS.TONE): UseToneStateReturn {
  const [selectedTone, setSelectedToneState] = useState(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_TONE);
    return saved || initialTone;
  });

  const setSelectedTone = useCallback((tone: string) => {
    setSelectedToneState(tone);
    localStorage.setItem(STORAGE_KEYS.LAST_TONE, tone);
  }, []);

  const resetTone = useCallback(() => {
    setSelectedToneState(DEFAULTS.TONE);
    localStorage.setItem(STORAGE_KEYS.LAST_TONE, DEFAULTS.TONE);
  }, []);

  return {
    selectedTone,
    setSelectedTone,
    resetTone,
  };
}
