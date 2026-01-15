
import React from 'react';
import Button from '../ui/Button';

interface Props {
  onStart: () => void;
}

const LandingView: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="animate-view flex flex-col items-center justify-center text-center py-12 lg:py-20">
      <div className="glass p-12 md:p-20 rounded-[48px] shadow-2xl max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 border border-white/60 text-xs font-semibold text-gray-500 mb-10 shadow-sm uppercase tracking-widest">
          <span className="animate-pulse">✨</span> AI 驱动的创意工作室
        </div>
        
        <h1 className="text-4xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
          让小红书创作 <br />
          <span className="xhs-text-red">从未如此简单</span>
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          融合 Gemini 2.5 尖端 AI 技术。<br />
          只需一句话或几张图，自动生成精美配图、吸睛标题与爆款文案。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button size="lg" onClick={onStart}>
            立即开始创作
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
          <Button variant="secondary" size="lg">
            <svg className="w-6 h-6 mr-2 xhs-text-red" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            观看演示
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-12 mt-20 pt-12 border-t border-gray-100/50">
          <div>
            <div className="text-4xl font-black text-gray-900">10,000+</div>
            <div className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-widest">活跃创作者</div>
          </div>
          <div>
            <div className="text-4xl font-black text-gray-900">500,000+</div>
            <div className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-widest">已生成笔记</div>
          </div>
          <div>
            <div className="text-4xl font-black text-gray-900">98%</div>
            <div className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-widest">用户好评率</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingView;
