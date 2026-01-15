
import React, { useState } from 'react';
import Header from './components/Header';
import BackgroundGrid from './components/BackgroundGrid';
import LandingView from './components/features/LandingView';
import EditorView from './components/features/EditorView';
import ResultView from './components/features/ResultView';
import { AppState, GeneratedContent } from './types';
import { generateXhsContent } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LANDING);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleGenerate = async (prompt: string, image?: string) => {
    setLoading(true);
    try {
      const result = await generateXhsContent(prompt, image);
      setGeneratedContent(result);
      setState(AppState.PREVIEW);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("生成失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedContent(null);
    setState(AppState.CREATING);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pt-24 pb-12 transition-colors duration-500">
      <BackgroundGrid />
      <Header onLogoClick={() => setState(AppState.LANDING)} />

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        {state === AppState.LANDING && (
          <LandingView onStart={() => setState(AppState.CREATING)} />
        )}

        {state === AppState.CREATING && (
          <EditorView onGenerate={handleGenerate} isLoading={loading} />
        )}

        {state === AppState.PREVIEW && generatedContent && (
          <ResultView content={generatedContent} onReset={handleReset} />
        )}
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-white rounded-3xl shadow-2xl border border-gray-100 flex items-center justify-center hover:scale-110 transition-transform group z-50">
        <svg className="w-8 h-8 text-gray-700 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};

export default App;
