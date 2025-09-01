# Mistral Tone Craft 🎯

A modern React application that intelligently adjusts text tone using Mistral AI's powerful language models. Built with TypeScript, Tailwind CSS, and professional development practices.

## Features ✨

- **AI-Powered Tone Adjustment**: Leverage Mistral AI to modify text tone while preserving meaning
- **Interactive Tone Selection**: Choose from 9 different tone styles with visual feedback
- **Real-time Processing**: Instant text transformation with loading states
- **Professional UI**: Clean, responsive design with accessibility in mind
- **Type Safety**: Full TypeScript implementation for robust development
- **Error Handling**: Comprehensive error boundaries and user feedback

## Tech Stack 🛠️

- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Mistral AI** for text processing
- **Lucide React** for icons

## Getting Started 🚀

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Mistral AI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/Mubashir2611/mistral-tone-craft.git
cd mistral-tone-craft
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file
echo "VITE_MISTRAL_API_KEY=your_api_key_here" > .env
echo "VITE_MISTRAL_MODEL=mistral-small-latest" >> .env
```

4. Start development server
```bash
npm run dev
```

## Available Scripts 📜

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure 📁

```
src/
├── components/         # React components
│   ├── ui/            # Base UI components
│   ├── TextEditor.tsx # Text editing interface
│   ├── TonePicker.tsx # Tone selection interface
│   └── ApiKeyInput.tsx
├── hooks/             # Custom React hooks
├── services/          # API services
├── types/             # TypeScript definitions
├── constants/         # App constants
├── lib/              # Utility functions
└── pages/            # Page components
```

## Usage 💡

1. Enter your Mistral AI API key
2. Type or paste your text in the editor
3. Select a tone from the tone picker matrix
4. Watch as your text is transformed instantly
5. Copy the result or continue editing

## Available Tones 🎨

- **Professional** - Formal business communication
- **Casual** - Relaxed and informal
- **Friendly** - Warm and approachable  
- **Serious** - Grave and important
- **Playful** - Fun and lighthearted
- **Creative** - Artistic and imaginative
- **Enthusiastic** - Energetic and excited
- **Confident** - Assertive and sure
- **Formal** - Official and structured

## Technical Architecture 🏗️

### Architecture Decisions

**1. Custom Hooks Pattern**
- **Decision**: Implemented custom hooks (`useApiKey`, `useToneAdjustment`, `useTextState`) instead of external state management libraries
- **Rationale**: For this application's scope, React's built-in state management with custom hooks provides sufficient complexity handling while maintaining simplicity and reducing bundle size
- **Trade-off**: Sacrificed advanced state management features (time-travel debugging, middleware) for simplicity and faster development

**2. Service Layer Architecture**
- **Decision**: Created a dedicated `MistralApiService` class with error handling and timeout management
- **Rationale**: Separates API concerns from UI components, provides centralized error handling, and makes the code testable and maintainable
- **Benefits**: Easy to mock for testing, centralized API configuration, consistent error handling

**3. TypeScript-First Development**
- **Decision**: Strict TypeScript configuration with comprehensive interface definitions
- **Rationale**: Prevents runtime errors, improves development experience, and makes the codebase self-documenting
- **Trade-off**: Slightly increased development time for better long-term maintainability

**4. Component Composition over Inheritance**
- **Decision**: Small, focused components with clear responsibilities
- **Rationale**: Easier testing, better reusability, and clearer code organization
- **Implementation**: `TextEditor`, `TonePicker`, and `ApiKeyInput` as separate, composable units

### State Management Strategy

**Application State Structure:**
```typescript
// Distributed across custom hooks for logical separation
useApiKey()        // API key persistence and validation
useTextState()     // Original and current text management  
useToneState()     // Tone selection with localStorage persistence
useToneAdjustment() // API call state and error handling
```

**Undo/Redo Functionality:**
- **Current Implementation**: Simple reset-to-original functionality
- **Architecture**: 
  - `originalText` state maintains the initial/base text
  - `currentText` tracks the current modified version
  - Reset operation: `setCurrentText(originalText)`
  - **Design Decision**: Chose simplicity over full undo/redo stack for MVP

**Enhanced Undo/Redo (Future Implementation):**
```typescript
interface TextHistory {
  past: string[];
  present: string;
  future: string[];
}

// Could be implemented with useReducer for complex undo/redo
const textHistoryReducer = (state: TextHistory, action: HistoryAction) => {
  // Handle UNDO, REDO, ADD_TO_HISTORY actions
}
```

**State Persistence:**
- API keys: localStorage with automatic loading on app startup
- Last selected tone: localStorage for user preference continuity
- Text content: Session-only (intentionally not persisted for privacy)

### Error Handling & Edge Cases

**1. Network & API Errors**
```typescript
// Comprehensive error categorization in MistralApiService
- Network timeouts (30s limit)
- API rate limiting
- Invalid API keys
- Malformed responses
- Service unavailability
```

**2. Error Boundary Implementation**
- **React Error Boundary**: Catches component render errors
- **Graceful Degradation**: Shows user-friendly error UI instead of white screen
- **Development vs Production**: Detailed error info in development, user-friendly messages in production

**3. Input Validation & Sanitization**
```typescript
// Multi-layer validation approach
- Client-side: Input format validation, length limits
- API layer: Request sanitization and validation  
- UI feedback: Real-time validation with user guidance
```

**4. Edge Cases Handled**
- **Empty text input**: User feedback with actionable guidance
- **API key validation**: Format checking before API calls
- **Large text input**: Character/token limits with user warnings
- **Network connectivity**: Retry logic and offline state detection
- **Concurrent requests**: Request deduplication and loading states

**5. Performance Considerations**
- **Debounced API calls**: Prevent excessive requests during typing
- **Request cancellation**: AbortController for abandoned requests
- **Memory management**: Proper cleanup in useEffect hooks
- **Bundle optimization**: Code splitting ready architecture

**6. Security Measures**
- **API key handling**: Local storage only, never sent to application servers
- **Input sanitization**: XSS prevention through proper escaping
- **HTTPS enforcement**: All external API calls use secure connections

### Monitoring & Observability

**Error Tracking Strategy:**
```typescript
// Structured error logging for production monitoring
{
  errorType: 'API_ERROR' | 'NETWORK_ERROR' | 'VALIDATION_ERROR',
  context: { userId?, apiEndpoint?, requestPayload? },
  timestamp: Date.now(),
  userAgent: navigator.userAgent
}
```

**Performance Metrics:**
- API response times
- Error rates by type
- User interaction patterns
- Bundle size optimization

This architecture provides a solid foundation for scaling while maintaining code quality and user experience.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License.

## Contact 📧

Mubashir - [@Mubashir2611](https://github.com/Mubashir2611)

Project Link: [https://tone-crafter-beta.vercel.app/](https://tone-crafter-beta.vercel.app/)

---

Built with ❤️ using modern React and TypeScript
