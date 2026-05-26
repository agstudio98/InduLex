import { useTranslation } from 'react-i18next';

/**
 * Main (Hero) Component
 * 
 * The visual centerpiece of the landing page. 
 * Features a high-quality background image with a glassmorphism content overlay,
 * presenting the brand name and primary slogan.
 * 
 * @returns {JSX.Element} The rendered hero section
 */
export const Main = () => {
  const { t } = useTranslation();
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center p-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1441984908747-52960f252441?q=80&w=2000&auto=format&fit=crop" 
          alt="Fashion Background" 
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
          style={{ animationDuration: '10s' }}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 glass p-10 md:p-20 rounded-[2.5rem] shadow-2xl max-w-4xl animate-fade-in-up">
        <h1 className="text-7xl md:text-9xl font-boldonse mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent tracking-tighter">
          InduLex
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        <p className="text-xl md:text-3xl font-quicksand text-white/90 leading-relaxed font-medium">
          {t('HOME.MAIN_SLOGAN')}
        </p>
        <button className="mt-10 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95">
          Explorar Colección
        </button>
      </div>
    </section>
  );
};