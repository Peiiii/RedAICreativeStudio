
import React from 'react';

const Header: React.FC<{ onLogoClick: () => void }> = ({ onLogoClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-4 bg-white/60 backdrop-blur-2xl border-b border-white/40">
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={onLogoClick}
      >
        <div className="w-10 h-10 rounded-2xl xhs-bg-red flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
          <span className="text-white font-black italic text-base">Red</span>
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-tight">RedAI</h1>
          <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">智能创作工作室</p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-10 text-sm font-bold text-gray-500 uppercase tracking-widest">
        <a href="#" className="hover:xhs-text-red transition-colors">功能特性</a>
        <a href="#" className="hover:xhs-text-red transition-colors">案例展示</a>
        <a href="#" className="hover:xhs-text-red transition-colors">价格方案</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">登录</button>
        <button className="px-6 py-2.5 text-sm font-black text-white xhs-bg-red rounded-full shadow-lg shadow-red-200 hover:scale-105 transition-transform active:scale-95">
          立即开始
        </button>
      </div>
    </nav>
  );
};

export default Header;
