// Core types for the application
export interface ToneOption {
  id: string;
  label: string;
  description?: string;
  position: string;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: 'success' | 'error' | 'loading';
}

export interface MistralApiResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface TextAdjustmentRequest {
  text: string;
  tone: string;
  model?: string;
}

export interface AppConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

// Component prop types
export interface TextEditorProps {
  originalText: string;
  currentText: string;
  onTextChange: (text: string) => void;
  onReset: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export interface TonePickerProps {
  selectedTone: string;
  onToneSelect: (tone: string) => void;
  onReset: () => void;
  disabled?: boolean;
  tones?: ToneOption[];
}

export interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  isLoading?: boolean;
  error?: string;
}

// State management types
export interface AppState {
  apiKey: string;
  originalText: string;
  currentText: string;
  selectedTone: string;
  isLoading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_API_KEY'; payload: string }
  | { type: 'SET_ORIGINAL_TEXT'; payload: string }
  | { type: 'SET_CURRENT_TEXT'; payload: string }
  | { type: 'SET_SELECTED_TONE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_TEXT' };
