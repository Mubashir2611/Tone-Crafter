/**
 * Validation utilities for the application
 */

/**
 * Validates if a string is a valid API key format
 */
export function isValidApiKey(apiKey: string): boolean {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }
  
  const trimmed = apiKey.trim();
  if (trimmed.length < 10) {
    return false;
  }
  
  // Basic pattern for API keys (alphanumeric, hyphens, underscores)
  const apiKeyPattern = /^[a-zA-Z0-9_-]+$/;
  return apiKeyPattern.test(trimmed);
}

/**
 * Validates if text is suitable for tone adjustment
 */
export function isValidTextForToneAdjustment(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }
  
  const trimmed = text.trim();
  // At least 5 characters and at least one word
  return trimmed.length >= 5 && trimmed.split(/\s+/).length >= 1;
}

/**
 * Sanitizes text input by removing potentially harmful content
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  // Remove control characters but preserve newlines and tabs
  // eslint-disable-next-line no-control-regex
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

/**
 * Truncates text to a maximum length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Formats a tone name for display
 */
export function formatToneName(tone: string): string {
  if (!tone) return '';
  
  return tone
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Debounce function for API calls
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Creates a safe delay for async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Safely parses JSON with error handling
 */
export function safeJsonParse<T = unknown>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}

/**
 * Gets a random item from an array
 */
export function getRandomItem<T>(array: T[]): T | undefined {
  if (!array.length) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Checks if the current environment is development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Formats a timestamp for display
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}
