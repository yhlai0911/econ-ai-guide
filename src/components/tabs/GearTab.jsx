import { memo, useState, useCallback } from 'react';
import { tools } from '../../data/tools';

const GearTab = memo(function GearTab() {
  const [activeTool, setActiveTool] = useState('notebooklm');

  const handleCopyPrompt = useCallback((prompt) => {
    navigator.clipboard.writeText(prompt.replace(/[「」]/g, ''));
  }, []);

  const currentTool = tools[activeTool];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tool Selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {Object.entries(tools).map(([key, tool]) => (
          <button
            key={key}
            onClick={() => setActiveTool(key)}
            className={`px-5 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTool === key
                ? `bg-gradient-to-r ${tool.color} shadow-lg`
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <span className="text-xl">{tool.icon}</span>
            {tool.name}
          </button>
        ))}
      </div>

      {/* Tool Content */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentTool.color} flex items-center justify-center text-3xl shadow-lg`}>
            {currentTool.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{currentTool.name}</h2>
            <p className="text-white/60">{currentTool.desc}</p>
          </div>
          <a
            href={currentTool.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-xl font-bold bg-gradient-to-r ${currentTool.color} hover:opacity-90 transition-all flex items-center gap-2`}
          >
            開啟工具 →
          </a>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold text-white/80 flex items-center gap-2">
            <span>📖</span> 操作步驟
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {currentTool.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-xl">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentTool.color} flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold mb-1">{step.title}</h4>
                  <p className="text-white/60 text-sm">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompts */}
        {currentTool.prompts.length > 0 && (
          <div className="p-5 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-xl">💬</span> 推薦咒語（Prompt）- 可直接複製
            </h3>
            <div className="space-y-3">
              {currentTool.prompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className={`p-4 bg-gradient-to-r ${currentTool.color} bg-opacity-10 rounded-xl border border-white/10 font-mono text-sm cursor-pointer hover:bg-opacity-20 transition-all`}
                  onClick={() => handleCopyPrompt(prompt)}
                  title="點擊複製"
                >
                  {prompt}
                  <span className="ml-2 text-xs opacity-50">📋 點擊複製</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default GearTab;
