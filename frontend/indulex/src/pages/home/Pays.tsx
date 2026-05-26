import { useTranslation } from 'react-i18next';
import { CreditCard, Truck, RefreshCcw } from 'lucide-react';

/**
 * Pays (Benefits) Component
 * 
 * Showcases secure payment methods and customer benefits like:
 * - Interest-free installments
 * - Free shipping thresholds
 * - Easy returns
 * 
 * @returns {JSX.Element} The rendered benefits section
 */
export const Pays = () => {
  const { t } = useTranslation();
  return (
    <section className="py-32 container mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-figtree font-black mb-20 text-center tracking-tight opacity-80">{t('HOME.PAYS_TITLE')}</h2>
      <div className="flex flex-wrap justify-center gap-12 lg:gap-24 animate-fade-in-up">
        {[
          { Icon: CreditCard, text: t('HOME.PAYS_3INSTALLMENTS'), color: 'text-green-400', bg: 'bg-green-400/10' },
          { Icon: Truck, text: t('HOME.PAYS_FREESHIPPING'), color: 'text-orange-400', bg: 'bg-orange-400/10' },
          { Icon: RefreshCcw, text: t('HOME.PAYS_EASYRETURN'), color: 'text-blue-400', bg: 'bg-blue-400/10' }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            <div className={`${item.bg} p-8 rounded-[2.5rem] glass border-white/10 mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]`}>
              <item.Icon size={48} className={item.color} />
            </div>
            <p className="font-black font-figtree tracking-tight text-xl opacity-80 group-hover:opacity-100 transition-opacity">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};