import { memo, useMemo } from 'react';
import dyuLogo from '../assets/dyu-logo.webp';

const Header = memo(function Header({ completedTasks }) {
  const progress = useMemo(() =>
    Math.round((completedTasks.length / 10) * 100),
    [completedTasks.length]
  );

  const progressTitle = useMemo(() => {
    if (progress === 0) return '🌱 冒險開始';
    if (progress <= 30) return '🚶 新手上路';
    if (progress <= 50) return '🏃 穩定前進';
    if (progress <= 70) return '⚔️ 中段Boss';
    if (progress <= 90) return '🔥 即將通關';
    return '🏆 任務完成！';
  }, [progress]);

  return (
    <header className="relative z-10 pt-8 pb-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Logo + 標籤區 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <img
            src={dyuLogo}
            alt="大葉大學財金系"
            className="h-16 md:h-20 object-contain drop-shadow-lg"
          />
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
            🎓 大葉大學 ｜ 大一經濟學 ｜ 期末自學週
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
          經濟學 AI 學習冒險指南
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          兩週時間，運用 Google AI 工具完成經濟議題分析報告 🚀
        </p>

        {/* Progress Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/60">{progressTitle}</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${Math.max(progress, 2)}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
            </div>
          </div>
          <p className="text-xs text-white/40 mt-2">已完成 {completedTasks.length} / 10 個任務</p>
        </div>
      </div>
    </header>
  );
});

export default Header;
