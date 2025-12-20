import { memo } from 'react';
import dyuLogo from '../assets/dyu-logo.webp';

const Footer = memo(function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/50 text-sm">
          <img
            src={dyuLogo}
            alt="大葉大學財金系"
            className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <div className="text-center md:text-left">
            <p>🎓 大葉大學財務金融學系 ｜ 大一經濟學 ｜ 期末自學週</p>
            <p className="mt-1 text-white/30">祝各位冒險者順利通關！ 🚀</p>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
