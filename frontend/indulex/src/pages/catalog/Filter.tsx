import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface FilterProps {
  filter: { category: string; search: string };
  setFilter: (f: any) => void;
}

/**
 * Filter Component
 * 
 * Provides search and categorization functionality for the product catalog.
 * It manages a text input for keyword searches and a list of category buttons.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.filter - Current filter state { category: string, search: string }
 * @param {Function} props.setFilter - Function to update the parent's filter state
 * @returns {JSX.Element} The rendered filter sidebar
 */
export const Filter = ({ filter, setFilter }: FilterProps) => {
  const { t } = useTranslation();

  return (
    <div className="sticky top-32 p-8 rounded-[2.5rem] glass dark:glass shadow-2xl border-white/20 dark:border-black/5 animate-fade-in-up">
      <h3 className="text-2xl font-figtree font-black mb-8 flex items-center gap-3 tracking-tight">
        <Search size={24} className="text-blue-500" /> {t('CATALOG.FILTER')}
      </h3>
      
      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1">{t('CATALOG.SEARCH_PLACEHOLDER')}</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder={t('CATALOG.SEARCH_PLACEHOLDER')} 
              className="w-full p-4 pl-12 rounded-2xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/5 focus:border-blue-500/50 outline-none transition-all focus:ring-4 focus:ring-blue-500/10"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1">Categoría</label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: '', label: t('CATALOG.CATEGORY_ALL') },
              { id: 'Hoodies', label: t('CATALOG.CATEGORY_HOODIES') },
              { id: 'T-Shirts', label: t('CATALOG.CATEGORY_TSHIRTS') },
              { id: 'Jackets', label: t('CATALOG.CATEGORY_JACKETS') },
              { id: 'Pants', label: t('CATALOG.CATEGORY_PANTS') },
              { id: 'Shoes', label: t('CATALOG.CATEGORY_SHOES') },
              { id: 'Accessories', label: t('CATALOG.CATEGORY_ACCESSORIES') }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter({ ...filter, category: cat.id })}
                className={`text-left px-5 py-3 rounded-xl transition-all font-bold text-sm ${
                  filter.category === cat.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-[1.02]' 
                    : 'hover:bg-white/10 dark:hover:bg-black/5 opacity-60 hover:opacity-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};