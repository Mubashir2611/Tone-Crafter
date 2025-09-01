import { ApiResponse, MistralApiResponse, TextAdjustmentRequest } from '@/types';
import { API_CONFIG, ERROR_MESSAGES } from '@/constants';
import { getDefaultModel } from '@/lib/env';

/**
 * Custom error class for API-related errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Service class for handling Mistral AI API interactions
 */
export class MistralApiService {
  private readonly baseUrl = API_CONFIG.MISTRAL_BASE_URL;
  private readonly timeout = API_CONFIG.REQUEST_TIMEOUT;

  /**
   * Adjusts the tone of the provided text using Mistral AI
   */
  async adjustTone(
    request: TextAdjustmentRequest,
    apiKey: string
  ): Promise<ApiResponse<string>> {
    if (!apiKey?.trim()) {
      return {
        status: 'error',
        error: ERROR_MESSAGES.NO_API_KEY
      };
    }

    if (!request.text?.trim()) {
      return {
        status: 'error',
        error: ERROR_MESSAGES.NO_TEXT
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.buildRequestBody(request)),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        throw new ApiError(
          errorData.message || ERROR_MESSAGES.API_REQUEST_FAILED,
          response.status,
          errorData.code
        );
      }

      const data: MistralApiResponse = await response.json();
      const adjustedText = this.extractTextFromResponse(data);

      return {
        status: 'success',
        data: adjustedText
      };

    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Builds the request body for the Mistral AI API
   */
  private buildRequestBody(request: TextAdjustmentRequest) {
    return {
      model: request.model || getDefaultModel(),
      messages: [
        {
          role: 'system',
          content: this.buildSystemPrompt(request.tone)
        },
        {
          role: 'user',
          content: request.text
        }
      ],
      temperature: API_CONFIG.TEMPERATURE,
      max_tokens: API_CONFIG.MAX_TOKENS,
    };
  }

  /**
   * Builds the system prompt for tone adjustment
   */
  private buildSystemPrompt(tone: string): string {
    return `You are a professional text editor that adjusts the tone of text. 
Rewrite the provided text to match the "${tone}" tone while preserving the core meaning and message. 
Keep the same structure and key information, only adjust the language style and tone.
Return only the rewritten text without any additional commentary or explanation.`;
  }

  /**
   * Extracts the adjusted text from the API response
   */
  private extractTextFromResponse(data: MistralApiResponse): string {
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new ApiError(ERROR_MESSAGES.INVALID_RESPONSE);
    }

    return content.trim();
  }

  /**
   * Parses error response from the API
   */
  private async parseErrorResponse(response: Response): Promise<{ message: string; code?: string }> {
    try {
      const errorData = await response.json();
      return {
        message: errorData.error?.message || errorData.message || ERROR_MESSAGES.API_REQUEST_FAILED,
        code: errorData.error?.code || errorData.code
      };
    } catch {
      return { message: ERROR_MESSAGES.API_REQUEST_FAILED };
    }
  }

  /**
   * Handles and formats errors consistently
   */
  private handleError(error: unknown): ApiResponse<string> {
    if (error instanceof ApiError) {
      return {
        status: 'error',
        error: error.message
      };
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          status: 'error',
          error: ERROR_MESSAGES.TIMEOUT_ERROR
        };
      }
      
      if (error.message.includes('fetch')) {
        return {
          status: 'error',
          error: ERROR_MESSAGES.NETWORK_ERROR
        };
      }

      return {
        status: 'error',
        error: error.message
      };
    }

    return {
      status: 'error',
      error: ERROR_MESSAGES.API_REQUEST_FAILED
    };
  }
}

// Export singleton instance
export const mistralApi = new MistralApiService();
