import { memo, useState } from 'react';
import { topics } from '../../data/topics';

const QuestTab = memo(function QuestTab() {
  const [expandedTopic, setExpandedTopic] = useState(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Mission Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">🎯</span> 主線任務：經濟議題分析報告
        </h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          選擇一個<span className="text-cyan-400 font-semibold">台灣經濟時事</span>，
          用課堂學到的概念分析，
          並透過 <span className="text-purple-400 font-semibold">Google AI 工具</span>協助完成 PDF 報告。
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-2xl p-5 border border-cyan-500/20">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-bold mb-1">使用範圍</h3>
            <p className="text-sm text-white/60">ch03-07，至少用 2 章概念</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl p-5 border border-purple-500/20">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-bold mb-1">報告長度</h3>
            <p className="text-sm text-white/60">2000-2500 字 + 圖表</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-pink-500/5 rounded-2xl p-5 border border-pink-500/20">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-bold mb-1">任務時間</h3>
            <p className="text-sm text-white/60">兩週（第一週交大綱）</p>
          </div>
        </div>
      </div>

      {/* Topic Selection */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <span className="text-3xl">🎪</span> 選擇你的冒險主題
        </h2>
        <p className="text-white/50 mb-6">點擊主題查看詳細事件，或自訂主題（須先與老師確認）</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              onClick={() => setExpandedTopic(expandedTopic === idx ? null : idx)}
              className={`bg-gradient-to-br ${topic.color} rounded-2xl p-5 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg ${expandedTopic === idx ? 'md:col-span-2 lg:col-span-3' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{topic.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{topic.difficulty}</span>
                  <span className={`text-sm transition-transform duration-300 ${expandedTopic === idx ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </div>
              <p className="text-sm text-white/90 mb-2">{topic.chapters}</p>
              <p className="text-xs text-white/70 border-t border-white/20 pt-2 mt-2">💡 {topic.hint}</p>

              {/* 展開的詳細事件 */}
              {expandedTopic === idx && topic.event && (
                <div className="mt-4 pt-4 border-t border-white/30 animate-fadeIn">
                  <div className="bg-black/20 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">📰</span>
                      <span className="text-xs bg-white/30 px-2 py-1 rounded-full">{topic.event.date}</span>
                    </div>
                    <h4 className="font-bold text-lg leading-snug">{topic.event.headline}</h4>
                  </div>

                  <div className="bg-black/10 rounded-xl p-4 mb-4">
                    <h5 className="font-bold mb-3 flex items-center gap-2">
                      <span>📋</span> 事件重點
                    </h5>
                    <ul className="space-y-2">
                      {topic.event.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-white/70">•</span>
                          <span className="text-white/90">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/20 rounded-xl p-4">
                    <h5 className="font-bold mb-2 flex items-center gap-2">
                      <span>🎯</span> 經濟學分析切入點
                    </h5>
                    <p className="text-sm text-white/95 leading-relaxed">{topic.event.analysis}</p>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-xs text-white/60 bg-black/20 px-3 py-1 rounded-full">
                      💡 可將以上資訊作為報告素材，並用 Gemini 搜尋更多相關新聞
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold mb-4 text-center">🚀 快速傳送門</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all flex items-center justify-center gap-3 group">
            <span className="text-2xl">📘</span>
            <div className="text-left">
              <div>NotebookLM</div>
              <div className="text-xs text-white/50">上傳講義、問問題</div>
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
          <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all flex items-center justify-center gap-3 group">
            <span className="text-2xl">✨</span>
            <div className="text-left">
              <div>Gemini</div>
              <div className="text-xs text-white/50">搜尋新聞、分析議題</div>
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
          <a href="https://tronclass.dyu.edu.tw/course/8030/content#/" target="_blank" rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all flex items-center justify-center gap-3 group">
            <span className="text-2xl">📤</span>
            <div className="text-left">
              <div>Tronclass</div>
              <div className="text-xs text-white/50">繳交作業</div>
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
        </div>
      </div>
    </div>
  );
});

export default QuestTab;
