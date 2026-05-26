import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const images = [
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop"
];

/**
 * Carrousel Component
 * 
 * An automated, high-impact image slider for the landing page.
 * It uses CSS transitions for smooth sliding effects and background blurs.
 * Includes progress indicators and auto-play functionality.
 * 
 * @returns {JSX.Element} The rendered image carrousel
 */
export const Carrousel = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] overflow-hidden group">
      {/* Dynamic Background Blur */}
      <div className="absolute inset-0 z-0 scale-110 blur-3xl opacity-30 transition-all duration-1000">
        <img src={images[index]} alt="bg-blur" className="w-full h-full object-cover" />
      </div>

      {images.map((img, i) => (
        <div 
          key={i}
          className={`absolute inset-0 transition-all duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1) ${
            i === index ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-110 translate-x-12'
          }`}
        >
          <img src={img} alt={`Slide ${i}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex items-center px-12 md:px-32">
            <div className="glass p-12 md:p-20 rounded-[3rem] border-white/10 shadow-2xl max-w-2xl animate-fade-in-up">
              <div className="w-16 h-1 bg-blue-500 mb-8 rounded-full"></div>
              <h2 className="text-5xl md:text-7xl font-figtree font-black text-white tracking-tighter leading-none mb-6">
                {t('HOME.CARROUSEL_TITLE')} <br /> <span className="text-blue-500 italic">{t('HOME.CARROUSEL_YEAR')}</span>
              </h2>
              <p className="text-xl text-white/60 font-medium leading-relaxed mb-10">
                {t('HOME.CARROUSEL_DESC')}
              </p>
              <button className="px-10 py-5 bg-white text-black rounded-2xl font-black text-lg hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                {t('HOME.CARROUSEL_BTN')}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === index ? 'w-12 bg-blue-500' : 'w-4 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};