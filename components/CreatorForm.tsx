
import React, { useState, useEffect } from 'react';
import { getInspirationPrompts } from '../services/geminiService';

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700">你的创意灵感</label>
          <button 
            type="button"
            onClick={fetchSuggestions}
            disabled={isFetchingSuggestions}
            className="flex items-center gap-1 text-xs text-red-500 font-medium hover:text-red-600 transition-colors disabled:opacity-50"
          >
            <svg className={`w-3.5 h-3.5 ${isFetchingSuggestions ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            换一批灵感
          </button>
        </div>
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：一家有氛围感的复古咖啡厅，阳光洒进窗户..."
          className="w-full h-32 px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none text-gray-700 mb-3"
          required
        />

        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPrompt(suggestion)}
              className="px-3 py-1.5 bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 rounded-full text-xs text-gray-600 hover:text-red-600 transition-all animate-in fade-in zoom-in duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              ✨ {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">上传产品图片 (可选)</label>
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
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition-all overflow-hidden"
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover" alt="Upload preview" />
            ) : (
              <div className="text-center">
                <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">点击上传或拖拽图片</p>
              </div>
            )}
          </label>
          {image && (
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className={`w-full py-4 rounded-full text-white font-bold text-lg shadow-xl shadow-red-200 transition-all flex items-center justify-center gap-2 ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'xhs-red hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            生成中...
          </>
        ) : (
          '开始智能创作 ✨'
        )}
      </button>
    </form>
  );
};

export default CreatorForm;
