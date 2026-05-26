import { useTranslation } from 'react-i18next';

/**
 * Footer Component
 * 
 * The global application footer containing site branding, navigational links, 
 * developer credits, social media links, and legal pointers.
 * It uses a glassmorphism design consistent with the InduLex aesthetic.
 * 
 * @returns {JSX.Element} The rendered footer
 */
export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="glass border-none py-16 px-6 mt-20 transition-all duration-500 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left mb-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-boldonse tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">InduLex</h3>
            <p className="text-sm font-medium opacity-50 leading-relaxed max-w-xs mx-auto md:mx-0">
              {t('FOOTER.DESC')}
            </p>
          </div>
          <div className="flex flex-col gap-3 font-bold text-sm opacity-60">
            <a href="#" className="hover:text-blue-500 transition-colors uppercase tracking-widest text-[10px]">{t('FOOTER.NEW_COLLECTION')}</a>
            <a href="#" className="hover:text-blue-500 transition-colors uppercase tracking-widest text-[10px]">{t('FOOTER.SIZE_GUIDE')}</a>
            <a href="#" className="hover:text-blue-500 transition-colors uppercase tracking-widest text-[10px]">{t('FOOTER.SUSTAINABILITY')}</a>
          </div>
          <div className="text-center md:text-right space-y-4">
            <p className="font-black font-figtree tracking-tight text-lg">
              {t('FOOTER.CREDITS')}
            </p>
            <div className="flex justify-center md:justify-end gap-4">
              {['Instagram', 'Twitter', 'Facebook'].map(social => (
                <a key={social} href="#" className="p-3 glass rounded-xl hover:bg-blue-500/10 transition-all text-xs font-bold">{social}</a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full h-px bg-white/5 mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 text-[10px] font-black uppercase tracking-[0.2em]">
          <span>&copy; 2026 InduLex Inc. All Rights Reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};