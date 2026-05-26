import { useTranslation } from 'react-i18next';

/**
 * Who (Essence) Component
 * 
 * An "About Us" style section that details the brand's essence and mission.
 * It features a split layout with a representative image and descriptive text, 
 * along with social proof (customer count).
 * 
 * @returns {JSX.Element} The rendered essence section
 */
export const Who = () => {
  const { t } = useTranslation();
  return (
    <section className="py-32 px-6 container mx-auto flex flex-col md:flex-row items-center gap-16">
      <div className="md:w-1/2 relative group">
        <div className="absolute -inset-4 bg-blue-500/20 rounded-[3rem] blur-2xl group-hover:bg-blue-500/30 transition-colors"></div>
        <img 
          src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1000&auto=format&fit=crop" 
          alt="InduLex Team" 
          className="relative rounded-[2.5rem] shadow-2xl transition-all duration-700 group-hover:scale-[1.03] group-hover:rotate-1"
        />
      </div>
      <div className="md:w-1/2 space-y-8 animate-fade-in-up">
        <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-bold text-sm tracking-widest uppercase">
          Sobre Nosotros
        </div>
        <h2 className="text-5xl md:text-6xl font-figtree font-black tracking-tight leading-tight">
          {t('HOME.WHO_TITLE')}
        </h2>
        <p className="text-xl opacity-70 leading-relaxed font-medium max-w-xl">
          {t('HOME.WHO_DESC')}
        </p>
        <div className="flex gap-4">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-day-bg dark:border-night-bg bg-gray-500 overflow-hidden shadow-lg">
                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
              </div>
            ))}
          </div>
          <p className="text-sm font-bold flex items-center gap-2">
            <span className="text-blue-500">+10k</span> Clientes satisfechos
          </p>
        </div>
      </div>
    </section>
  );
};