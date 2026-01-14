
import React from 'react';

const Header: React.FC<{ onLogoClick: () => void }> = ({ onLogoClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-md border-b border-gray-100">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={onLogoClick}
      >
        <div className="w-8 h-8 rounded-lg xhs-red flex items-center justify-center">
          <span className="text-white font-bold italic text-sm">Red</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">灵感一触即发</h1>
          <p className="text-[10px] text-gray-500 tracking-widest uppercase">让创作从未如此简单</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <a href="#" className="hover:text-red-500 transition-colors">产品特色</a>
        <a href="#" className="hover:text-red-500 transition-colors">使用流程</a>
        <a href="#" className="hover:text-red-500 transition-colors">案例展示</a>
        <a href="#" className="hover:text-red-500 transition-colors">价格方案</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-gray-700 hover:text-gray-900">登录</button>
        <button className="px-5 py-2 text-sm font-semibold text-white xhs-red rounded-full shadow-lg shadow-red-200 hover:scale-105 transition-transform active:scale-95">
          免费注册
        </button>
      </div>
    </nav>
  );
};

export default Header;
