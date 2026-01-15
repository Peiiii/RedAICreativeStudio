
import React from 'react';
import PostPreview from '../PostPreview';
import { GeneratedContent } from '../../types';

interface Props {
  content: GeneratedContent;
  onReset: () => void;
}

const ResultView: React.FC<Props> = ({ content, onReset }) => {
  return (
    <div className="animate-view py-8">
      <div className="glass p-8 md:p-14 rounded-[48px] shadow-2xl">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
              ✨
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 leading-none">创作完成</h2>
              <p className="text-gray-500 mt-1 text-sm">点击文案可直接编辑或复制</p>
            </div>
          </div>
          <span className="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-black rounded-full uppercase tracking-widest">
            AI Generated
          </span>
        </div>
        <PostPreview content={content} onReset={onReset} />
      </div>
    </div>
  );
};

export default ResultView;
