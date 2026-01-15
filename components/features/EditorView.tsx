
import React from 'react';
import CreatorForm from '../CreatorForm';

interface Props {
  onGenerate: (prompt: string, image?: string) => void;
  isLoading: boolean;
}

const EditorView: React.FC<Props> = ({ onGenerate, isLoading }) => {
  return (
    <div className="animate-view max-w-2xl mx-auto py-12">
      <div className="glass p-10 md:p-12 rounded-[40px] shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 xhs-bg-red rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
            ✍️
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 leading-none">开启创作</h2>
            <p className="text-gray-500 mt-1 text-sm">简单描述，AI 实时构思</p>
          </div>
        </div>
        <CreatorForm onGenerate={onGenerate} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default EditorView;
