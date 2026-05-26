import { useTranslation } from 'react-i18next';

/**
 * Timeline Component
 * 
 * Displays the historical evolution and major milestones of the brand.
 * Uses a responsive layout with connection lines and numbered steps.
 * 
 * @returns {JSX.Element} The rendered brand evolution section
 */
export const Timeline = () => {
  const { t } = useTranslation();

  const steps = [
    { year: '2020', event: t('HOME.TIMELINE_STEP1') },
    { year: '2022', event: t('HOME.TIMELINE_STEP2') },
    { year: '2024', event: t('HOME.TIMELINE_STEP3') },
    { year: '2026', event: t('HOME.TIMELINE_STEP4') }
  ];

  return (
    <section className="py-32 container mx-auto px-6 overflow-hidden">
      <div className="text-center mb-24 space-y-4">
        <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-bold text-xs tracking-widest uppercase">
          {t('HOME.TIMELINE_SUBTITLE')}
        </div>
        <h2 className="text-5xl md:text-7xl font-figtree font-black tracking-tight leading-none">
          {t('HOME.TIMELINE')}
        </h2>
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8 animate-fade-in-up">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent hidden md:block"></div>
        
        {steps.map((step, i) => (
          <div key={i} className="relative z-10 glass p-10 rounded-[2.5rem] md:w-1/4 group hover:scale-[1.05] transition-all duration-500 border-white/10 shadow-2xl">
            <div className="absolute -top-4 -left-4 w-12 h-12 glass rounded-2xl flex items-center justify-center font-black text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {i + 1}
            </div>
            <h3 className="text-4xl font-black font-figtree mb-3 text-blue-500 tracking-tighter">{step.year}</h3>
            <div className="w-10 h-1 bg-blue-500/30 mb-4 rounded-full"></div>
            <p className="font-bold text-lg opacity-60 leading-tight group-hover:opacity-100 transition-opacity">{step.event}</p>
          </div>
        ))}
      </div>
    </section>
  );
};