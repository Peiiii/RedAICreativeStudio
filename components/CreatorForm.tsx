
import React, { useState, useEffect } from 'react';
import { getInspirationPrompts } from '../services/geminiService';
import Button from './ui/Button';

interface Props {
  onGenerate: (prompt: string, image?: string) => void;
  isLoading: boolean;
}

const CreatorForm: React.FC<Props> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  const fetchSuggestions = async () => {
    setIsFetchingSuggestions(true);
    try {
      const ideas = await getInspirationPrompts();
      setSuggestions(ideas);
    } catch (error) {
      console.error("Failed to fetch suggestions", error);
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, image?.split(',')[1]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-black text-gray-400 uppercase tracking-widest">创作灵感</label>
          <button 
            type="button"
            onClick={fetchSuggestions}
            disabled={isFetchingSuggestions}
            className="flex items-center gap-1.5 text-xs text-red-500 font-black hover:text-red-600 transition-colors disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${isFetchingSuggestions ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            换一批灵感
          </button>
        </div>
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="描述你的创作想法，例如：一个极简风格的夏日冷饮配方，突出清新感和清凉感..."
          className="w-full h-40 px-6 py-5 rounded-[24px] bg-white/50 border border-gray-100 focus:ring-4 focus:ring-red-500/10 focus:border-red-500/50 outline-none transition-all resize-none text-gray-700 mb-4 shadow-inner text-lg leading-relaxed placeholder:text-gray-300"
          required
        />

        <div className="flex flex-wrap gap-2.5">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPrompt(suggestion)}
              className="px-4 py-2 bg-white/80 hover:xhs-bg-red hover:text-white border border-gray-100 rounded-full text-xs font-bold text-gray-600 transition-all duration-300 shadow-sm"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              ✨ {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-4">视觉参考（可选）</label>
        <div className="relative group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-[24px] cursor-pointer hover:xhs-border-red hover:bg-red-50/20 transition-all overflow-hidden bg-gray-50/50"
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover" alt="Upload preview" />
            ) : (
              <div className="text-center group-hover:scale-105 transition-transform">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-3">
                   <svg className="h-7 w-7 text-red-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">点击或拖拽图片上传</p>
              </div>
            )}
          </label>
          {image && (
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-gray-900 shadow-xl hover:bg-red-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full py-5 text-xl" 
        isLoading={isLoading}
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? '正在构思创作...' : '开始智能生成 ✨'}
      </Button>
    </form>
  );
};

export default CreatorForm;
