// Environment variables configuration
export const env = {
  MISTRAL_API_KEY: import.meta.env.VITE_MISTRAL_API_KEY || '',
  MISTRAL_MODEL: import.meta.env.VITE_MISTRAL_MODEL || 'mistral-small-latest',
} as const;

// Default API key from environment or empty string for user input
export const getDefaultApiKey = () => env.MISTRAL_API_KEY;
export const getDefaultModel = () => env.MISTRAL_MODEL;
