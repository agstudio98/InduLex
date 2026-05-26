import { useTranslation } from 'react-i18next';
import { Zap, Shield, Star } from 'lucide-react';

/**
 * Slogans Component
 * 
 * Highlights the brand's core values (Speed, Quality, Style) using 
 * icon-based cards and decorative background elements.
 * 
 * @returns {JSX.Element} The rendered slogans section
 */
export const Slogans = () => {
  const { t } = useTranslation();
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-figtree font-black mb-20 italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {t('HOME.SLOGANS')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { Icon: Zap, color: 'text-yellow-400', label: t('HOME.SLOGANS_SPEED'), bg: 'bg-yellow-400/10' },
            { Icon: Shield, color: 'text-blue-400', label: t('HOME.SLOGANS_QUALITY'), bg: 'bg-blue-400/10' },
            { Icon: Star, color: 'text-purple-400', label: t('HOME.SLOGANS_STYLE'), bg: 'bg-purple-400/10' }
          ].map(({ Icon, color, label, bg }, idx) => (
            <div key={idx} className="glass p-12 rounded-[2rem] shadow-2xl transition-all duration-500 hover:scale-[1.05] group border border-white/10">
              <div className={`${bg} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:rotate-6 transition-transform`}>
                <Icon className={color} size={40} />
              </div>
              <h3 className="text-2xl font-black mb-4 font-figtree tracking-tight">{label}</h3>
              <p className="opacity-60 leading-relaxed font-medium">{t('HOME.SLOGANS_DESC')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};