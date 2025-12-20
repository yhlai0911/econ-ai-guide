import { memo } from 'react';
import { navTabs } from '../data/tools';

const Navigation = memo(function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="relative z-10 px-6 mb-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2">
          {navTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-left ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <div className="text-sm md:text-base">{tab.label}</div>
              <div className="text-xs opacity-60">{tab.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
});

export default Navigation;
