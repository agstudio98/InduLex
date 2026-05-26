import { useTranslation } from 'react-i18next';

const topProducts = [
  { id: 1, nameKey: 'CATALOG.PRODUCTS.HOODIE_URBAN', price: '$55.00', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop' },
  { id: 2, nameKey: 'CATALOG.PRODUCTS.TSHIRT_MINIMAL', price: '$25.00', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop' },
  { id: 3, nameKey: 'CATALOG.PRODUCTS.JACKET_TECH', price: '$85.00', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop' },
  { id: 4, nameKey: 'CATALOG.PRODUCTS.PANTS_CARGO', price: '$45.00', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop' },
  { id: 5, nameKey: 'CATALOG.PRODUCTS.SHOES_RUNNING', price: '$120.00', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop' },
  { id: 6, nameKey: 'CATALOG.PRODUCTS.CAP_CURVED', price: '$15.00', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400&auto=format&fit=crop' }
];

/**
 * Top (Featured Collection) Component
 * 
 * Showcases a curated selection of "trending" products.
 * Includes a link to the full catalog and visually rich product cards 
 * with quick-action buttons.
 * 
 * @returns {JSX.Element} The rendered featured collection section
 */
export const Top = () => {
  const { t } = useTranslation();
  return (
    <section className="py-32 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-bold text-sm tracking-widest uppercase mb-6">
            Trending Now
          </div>
          <h2 className="text-5xl md:text-7xl font-figtree font-black tracking-tight leading-none">
            {t('HOME.TOP_TITLE')}
          </h2>
        </div>
        <button className="text-lg font-bold border-b-2 border-blue-500 pb-1 hover:text-blue-500 transition-colors">
          {t('CATALOG.PAGINATION_NEXT')} →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {topProducts.map((p) => (
          <div key={p.id} className="group glass rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4">
            <div className="h-[450px] overflow-hidden relative">
              <img 
                src={p.img} 
                alt={t(p.nameKey)} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-blue-400 font-black text-2xl mb-2">{p.price}</p>
                <h3 className="text-3xl font-black text-white font-figtree tracking-tight">{t(p.nameKey)}</h3>
              </div>
              <button className="absolute top-6 right-6 w-12 h-12 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};