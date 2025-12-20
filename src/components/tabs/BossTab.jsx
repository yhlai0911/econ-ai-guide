import { memo } from 'react';
import { reportStructure } from '../../data/tasks';

const BossTab = memo(function BossTab() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="text-3xl">📄</span> 報告架構（照這個順序寫）
        </h2>

        <div className="space-y-4">
          {reportStructure.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-bold text-xl flex-shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.section}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-2xl font-bold text-amber-400">{item.weight}</span>
                <p className="text-xs text-white/40">{item.words}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grading Breakdown */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="text-3xl">⭐</span> 評分標準
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">經濟概念運用</span>
              <span className="text-cyan-400 font-bold text-xl">35%</span>
            </div>
            <p className="text-sm text-white/60">正確使用至少 2 章概念分析議題</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">分析邏輯深度</span>
              <span className="text-purple-400 font-bold text-xl">25%</span>
            </div>
            <p className="text-sm text-white/60">論述有條理、有自己的見解</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-500/5 border border-pink-500/20">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">AI 使用反思</span>
              <span className="text-pink-400 font-bold text-xl">20%</span>
            </div>
            <p className="text-sm text-white/60">說明怎麼用 AI、有沒有抓到 AI 的錯</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">格式與圖表</span>
              <span className="text-amber-400 font-bold text-xl">10%</span>
            </div>
            <p className="text-sm text-white/60">PDF 格式正確、圖表清晰</p>
          </div>
          <div className="md:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">🚩 第一週大綱</span>
              <span className="text-emerald-400 font-bold text-xl">10%</span>
            </div>
            <p className="text-sm text-white/60">準時繳交、內容完整</p>
          </div>
        </div>
      </div>

      {/* AI Reflection Tips */}
      <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">🤔</span> 「AI 使用反思」怎麼寫才能拿高分？
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-white/80">
          <div className="p-4 bg-white/5 rounded-xl">
            <p className="font-bold text-emerald-400 mb-1">✅ 要寫的</p>
            <ul className="text-sm space-y-1">
              <li>• 用了哪些工具？各用在什麼地方？</li>
              <li>• AI 有沒有給錯誤答案？你怎麼發現的？</li>
              <li>• 你怎麼修改 AI 的回答？</li>
              <li>• 附上 2-3 張對話截圖</li>
            </ul>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <p className="font-bold text-red-400 mb-1">❌ 不要寫</p>
            <ul className="text-sm space-y-1">
              <li>• 「我用 AI 幫我寫報告」（太籠統）</li>
              <li>• 「AI 很好用」（沒有具體說明）</li>
              <li>• 只貼截圖沒有說明</li>
              <li>• 完全沒提到 AI 有什麼限制</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BossTab;
