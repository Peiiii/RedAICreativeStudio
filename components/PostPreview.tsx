
import React from 'react';
import { GeneratedContent } from '../types';
import Button from './ui/Button';

interface Props {
  content: GeneratedContent;
  onReset: () => void;
}

const PostPreview: React.FC<Props> = ({ content, onReset }) => {
  const copyToClipboard = () => {
    const fullText = `${content.title}\n\n${content.caption}\n\n${content.tags.map(t => `#${t}`).join(' ')}`;
    navigator.clipboard.writeText(fullText);
    alert("文案已成功复制到剪贴板！");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">笔记海报预览</h3>
          <span className="text-xs text-gray-400">比例 3:4</span>
        </div>
        <div className="aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl bg-gray-100 relative group border-4 border-white">
          {content.imageUrl ? (
            <img src={content.imageUrl} className="w-full h-full object-cover" alt="AI Generated" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <div className="animate-spin h-8 w-8 border-4 border-red-500 border-t-transparent rounded-full mb-4"></div>
              图片生成中...
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <button className="bg-white px-6 py-3 rounded-full font-bold text-gray-900 text-sm shadow-2xl hover:scale-105 transition-transform">
              下载高清原图
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">智能生成的文案</h3>
        <div className="flex-1 bg-white/50 p-8 rounded-[32px] border border-white shadow-inner flex flex-col">
          <input 
            defaultValue={content.title}
            className="text-2xl font-bold text-gray-900 mb-6 bg-transparent border-none focus:ring-0 w-full"
            placeholder="笔记标题"
          />
          <textarea 
            defaultValue={content.caption}
            className="flex-1 overflow-y-auto pr-2 space-y-4 text-gray-700 whitespace-pre-wrap text-base leading-relaxed bg-transparent border-none focus:ring-0 resize-none"
            placeholder="笔记正文..."
          />
          <div className="mt-8 pt-8 border-t border-gray-100/50 flex flex-wrap gap-2">
            {content.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs rounded-full hover:bg-blue-100 cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-10 flex gap-4">
          <Button variant="secondary" className="flex-1" onClick={onReset}>
            重新创作
          </Button>
          <Button variant="primary" className="flex-1" onClick={copyToClipboard}>
            复制全文
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
