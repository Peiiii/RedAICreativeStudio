
import React from 'react';

const BackgroundGrid: React.FC = () => {
  const cards = [
    { title: '存不下钱?', sub: '适合上班族的理财法', color: 'bg-emerald-50' },
    { title: '备婚狂魔', sub: '超全备婚清单', color: 'bg-rose-50' },
    { title: '扔扔扔', sub: '断舍离清单', color: 'bg-orange-50' },
    { title: '超酷炫', sub: '电竞桌面搭建', color: 'bg-blue-50' },
    { title: '米其林大餐', sub: '在家也能做', color: 'bg-amber-50' },
    { title: '英语口语', sub: '每天15分钟', color: 'bg-indigo-50' },
    { title: '精致女孩', sub: '夏季防晒攻略', color: 'bg-pink-50' },
    { title: '数码好物', sub: '开箱评测', color: 'bg-slate-50' },
    { title: '自律生活', sub: '早起打卡指南', color: 'bg-cyan-50' },
    { title: '氛围感装修', sub: '百元改造计划', color: 'bg-yellow-50' },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6">
        {[...cards, ...cards, ...cards].map((card, i) => (
          <div 
            key={i} 
            className={`${card.color} h-64 rounded-2xl p-4 flex flex-col justify-end border border-white/50 shadow-sm animate-float`}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundGrid;
