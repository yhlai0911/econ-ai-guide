import { memo, useState, useCallback } from 'react';
import { faqs } from '../../data/tasks';

const NpcTab = memo(function NpcTab() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = useCallback((idx) => {
    setExpandedFaq(prev => prev === idx ? null : idx);
  }, []);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🧙‍♂️</div>
        <h2 className="text-2xl font-bold">智慧老人的問答小屋</h2>
        <p className="text-white/60">點擊問題查看解答</p>
      </div>

      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
        >
          <button
            onClick={() => toggleFaq(idx)}
            className="w-full p-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <span className="font-bold pr-4 flex items-center gap-3">
              <span className="text-2xl">❓</span>
              {faq.q}
            </span>
            <span className={`text-2xl transition-transform duration-300 ${expandedFaq === idx ? 'rotate-45' : ''}`}>
              +
            </span>
          </button>
          {expandedFaq === idx && (
            <div className="px-5 pb-5 text-white/70 border-t border-white/10 pt-4 animate-fadeIn">
              <div className="flex gap-3">
                <span className="text-2xl">💬</span>
                <p>{faq.a}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Contact */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/10 text-center">
        <div className="text-4xl mb-3">🎓</div>
        <p className="text-white/60 mb-2">還有其他問題？</p>
        <p className="font-bold">到 Tronclass 創課系統發問，或下課找老師聊聊！</p>
      </div>
    </div>
  );
});

export default NpcTab;
