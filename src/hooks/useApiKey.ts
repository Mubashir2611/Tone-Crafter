import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/constants';
import { getDefaultApiKey } from '@/lib/env';

interface UseApiKeyReturn {
  apiKey: string;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
  hasApiKey: boolean;
}

/**
 * Custom hook for managing API key state and persistence
 */
export function useApiKey(): UseApiKeyReturn {
  const [apiKey, setApiKeyState] = useState<string>('');

  useEffect(() => {
    // Try to load API key from environment first, then localStorage
    const defaultKey = getDefaultApiKey();
    const savedApiKey = localStorage.getItem(STORAGE_KEYS.API_KEY);
    
    if (defaultKey) {
      setApiKeyState(defaultKey);
    } else if (savedApiKey) {
      setApiKeyState(savedApiKey);
    }
  }, []);

  const setApiKey = useCallback((key: string) => {
    const trimmedKey = key.trim();
    setApiKeyState(trimmedKey);
    
    if (trimmedKey) {
      localStorage.setItem(STORAGE_KEYS.API_KEY, trimmedKey);
    } else {
      localStorage.removeItem(STORAGE_KEYS.API_KEY);
    }
  }, []);

  const clearApiKey = useCallback(() => {
    setApiKeyState('');
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
  }, []);

  const hasApiKey = Boolean(apiKey.trim());

  return {
    apiKey,
    setApiKey,
    clearApiKey,
    hasApiKey,
  };
}
