
import React, { useState } from 'react';
import Header from './components/Header';
import BackgroundGrid from './components/BackgroundGrid';
import CreatorForm from './components/CreatorForm';
import PostPreview from './components/PostPreview';
import { AppState, GeneratedContent } from './types';
import { generateXhsContent } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LANDING);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleStart = () => {
    setState(AppState.CREATING);
  };

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
    <div className="min-h-screen relative overflow-x-hidden pt-24 pb-12">
      <BackgroundGrid />
      <Header onLogoClick={() => setState(AppState.LANDING)} />

      <main className="max-w-6xl mx-auto px-6 relative">
        {state === AppState.LANDING && (
          <div className="flex flex-col items-center justify-center text-center py-12 lg:py-24">
            <div className="glass-card p-12 md:p-20 rounded-[40px] shadow-2xl max-w-4xl border border-white/40">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 border border-white/60 text-xs font-semibold text-gray-500 mb-8 shadow-sm">
                <span>✨</span> AI 驱动的内容创作革命
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-4">
                让小红书创作 <br />
                <span className="xhs-text-red">简单到只需一句话</span>
              </h1>
              
              <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                输入一个主题，AI 自动生成专业级小红书图文内容。<br />
                精美配图、吸睛标题、爆款文案，一键搞定。
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={handleStart}
                  className="px-10 py-5 text-xl font-bold text-white xhs-red rounded-full shadow-2xl shadow-red-200 hover:scale-105 transition-all active:scale-95 group flex items-center gap-2"
                >
                  开始免费体验 
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button className="px-10 py-5 text-xl font-bold text-gray-700 bg-white border border-gray-100 rounded-full shadow-xl hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2">
                  <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  观看演示
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-gray-100">
                <div>
                  <div className="text-3xl font-bold text-gray-900">10k+</div>
                  <div className="text-xs text-gray-400 font-medium mt-1">创作者</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">50w+</div>
                  <div className="text-xs text-gray-400 font-medium mt-1">内容生成</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-xs text-gray-400 font-medium mt-1">好评率</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {state === AppState.CREATING && (
          <div className="max-w-2xl mx-auto py-12">
            <div className="glass-card p-8 md:p-10 rounded-[32px] shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">开启创作之旅</h2>
              <p className="text-gray-500 mb-8">简单描述你的想法，或者上传一张产品图，剩下的交给我们。</p>
              <CreatorForm onGenerate={handleGenerate} isLoading={loading} />
            </div>
          </div>
        )}

        {state === AppState.PREVIEW && generatedContent && (
          <div className="py-8">
            <div className="glass-card p-8 md:p-12 rounded-[40px] shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold text-gray-900">生成结果</h2>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">创作完成</span>
              </div>
              <PostPreview content={generatedContent} onReset={handleReset} />
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button for Help/Chat */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-2xl border border-gray-100 flex items-center justify-center hover:scale-110 transition-transform group">
        <svg className="w-7 h-7 text-gray-700 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};

export default App;
