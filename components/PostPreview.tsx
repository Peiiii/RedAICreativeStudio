
import React from 'react';
import { GeneratedContent } from '../types';

interface Props {
  content: GeneratedContent;
  onReset: () => void;
}

const PostPreview: React.FC<Props> = ({ content, onReset }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">智能生成配图</h3>
        <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 relative group">
          {content.imageUrl ? (
            <img src={content.imageUrl} className="w-full h-full object-cover" alt="AI Generated" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">图片生成中...</div>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="bg-white/90 px-4 py-2 rounded-full font-bold text-gray-900 text-sm shadow-lg">下载原图</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">智能文案</h3>
        <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
            {content.caption}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {content.tags.map((tag, i) => (
              <span key={i} className="text-blue-500 font-medium text-sm hover:underline cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex gap-4">
          <button 
            onClick={onReset}
            className="flex-1 py-3 px-6 rounded-full border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            重新生成
          </button>
          <button className="flex-1 py-3 px-6 rounded-full xhs-red font-bold text-white shadow-lg shadow-red-100 hover:scale-[1.02] active:scale-[0.98] transition-all">
            复制全文
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
