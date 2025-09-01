import { ToneOption } from '@/types';

// API Configuration
export const API_CONFIG = {
  MISTRAL_BASE_URL: 'https://api.mistral.ai/v1/chat/completions',
  REQUEST_TIMEOUT: 30000,
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  API_KEY: 'mistral_api_key',
  LAST_TONE: 'last_selected_tone',
  USER_PREFERENCES: 'user_preferences',
} as const;

// Default Values
export const DEFAULTS = {
  TEXT: "Hey there, awesome folks!\n\nGuess what's about to make a splash? Project Gemini, our super cool new dev adventure, is ready to take off! So, grab some snacks, 'cause we're just 30 days away from the big party!",
  TONE: 'casual',
  MODEL: 'mistral-small-latest',
} as const;

// Tone Matrix Configuration
export const TONE_MATRIX: ToneOption[][] = [
  [
    { id: "professional", label: "Professional", position: "top-left", description: "Formal business communication" },
    { id: "serious", label: "Serious", position: "top-center", description: "Grave and important tone" },
    { id: "formal", label: "Formal", position: "top-right", description: "Official and structured" }
  ],
  [
    { id: "friendly", label: "Friendly", position: "middle-left", description: "Warm and approachable" },
    { id: "casual", label: "Casual", position: "middle-center", description: "Relaxed and informal" },
    { id: "playful", label: "Playful", position: "middle-right", description: "Fun and lighthearted" }
  ],
  [
    { id: "creative", label: "Creative", position: "bottom-left", description: "Artistic and imaginative" },
    { id: "enthusiastic", label: "Enthusiastic", position: "bottom-center", description: "Energetic and excited" },
    { id: "confident", label: "Confident", position: "bottom-right", description: "Assertive and sure" }
  ]
];

// Flatten the tone matrix for easier access
export const ALL_TONES = TONE_MATRIX.flat();

// Error Messages
export const ERROR_MESSAGES = {
  NO_API_KEY: 'API key is required to use this service',
  NO_TEXT: 'Please enter some text to adjust',
  API_REQUEST_FAILED: 'Failed to adjust tone. Please try again.',
  INVALID_RESPONSE: 'Received invalid response from the AI service',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  TONE_ADJUSTED: (tone: string) => `Text has been adjusted to ${tone} tone.`,
  API_KEY_SAVED: 'API key saved successfully',
  TEXT_RESET: 'Text has been reset to original',
} as const;
