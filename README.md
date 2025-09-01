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

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License.

## Contact 📧

Mubashir - [@Mubashir2611](https://github.com/Mubashir2611)

Project Link: [https://github.com/Mubashir2611/mistral-tone-craft](https://github.com/Mubashir2611/mistral-tone-craft)

---

Built with ❤️ using modern React and TypeScript
