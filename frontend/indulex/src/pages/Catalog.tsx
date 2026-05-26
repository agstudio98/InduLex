import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Main as CatalogMain } from './catalog/Main';
import { Filter } from './catalog/Filter';

const PRODUCT_DATA = [
  { id: 1, nameKey: 'CATALOG.PRODUCTS.HOODIE_URBAN', price: 55.00, category: 'Hoodies' },
  { id: 2, nameKey: 'CATALOG.PRODUCTS.TSHIRT_MINIMAL', price: 25.00, category: 'T-Shirts' },
  { id: 3, nameKey: 'CATALOG.PRODUCTS.JACKET_TECH', price: 85.00, category: 'Jackets' },
  { id: 4, nameKey: 'CATALOG.PRODUCTS.PANTS_CARGO', price: 45.00, category: 'Pants' },
  { id: 5, nameKey: 'CATALOG.PRODUCTS.SHOES_RUNNING', price: 120.00, category: 'Shoes' },
  { id: 6, nameKey: 'CATALOG.PRODUCTS.CAP_CURVED', price: 15.00, category: 'Accessories' },
  { id: 7, nameKey: 'CATALOG.PRODUCTS.SHORTS_FLEX', price: 30.00, category: 'Accessories' },
  { id: 8, nameKey: 'CATALOG.PRODUCTS.TSHIRT_TRAINING', price: 28.00, category: 'T-Shirts' },
  { id: 9, nameKey: 'CATALOG.PRODUCTS.HOODIE_ESSENTIAL', price: 48.00, category: 'Hoodies' },
  { id: 10, nameKey: 'CATALOG.PRODUCTS.TSHIRT_VINTAGE', price: 22.00, category: 'T-Shirts' },
  { id: 11, nameKey: 'CATALOG.PRODUCTS.JACKET_DENIM', price: 75.00, category: 'Jackets' },
  { id: 12, nameKey: 'CATALOG.PRODUCTS.PANTS_JOGGER', price: 40.00, category: 'Pants' },
  { id: 13, nameKey: 'CATALOG.PRODUCTS.HOODIE_URBAN', price: 55.00, category: 'Hoodies' }, // Duplicates for pagination testing
  { id: 14, nameKey: 'CATALOG.PRODUCTS.TSHIRT_MINIMAL', price: 25.00, category: 'T-Shirts' },
  { id: 15, nameKey: 'CATALOG.PRODUCTS.JACKET_TECH', price: 85.00, category: 'Jackets' },
  { id: 16, nameKey: 'CATALOG.PRODUCTS.PANTS_CARGO', price: 45.00, category: 'Pants' },
  { id: 17, nameKey: 'CATALOG.PRODUCTS.SHOES_RUNNING', price: 120.00, category: 'Shoes' },
  { id: 18, nameKey: 'CATALOG.PRODUCTS.CAP_CURVED', price: 15.00, category: 'Accessories' },
];

/**
 * Catalog Page Component
 * 
 * The main product exploration page. 
 * It manages the catalog's business logic, including:
 * - Fetching/Simulating product data
 * - Client-side filtering by search term and category
 * - Pagination control
 * It coordinates between the `Filter` and `CatalogMain` components.
 * 
 * @returns {JSX.Element} The rendered catalog page
 */
export const Catalog = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({ category: '', search: '' });
  const itemsPerPage = 6;

  useEffect(() => {
    // Client-side filtering simulation
    let filtered = PRODUCT_DATA.filter(p => {
      const name = t(p.nameKey).toLowerCase();
      const searchTerm = filter.search.toLowerCase();
      const matchesSearch = name.includes(searchTerm);
      const matchesCategory = filter.category === '' || p.category === filter.category;
      return matchesSearch && matchesCategory;
    });

    const total = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(total || 1);

    // Reset to page 1 if filter changes
    if (currentPage > total && total > 0) {
      setCurrentPage(1);
    }

    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);
    setProducts(paginated);
  }, [currentPage, filter, t]);

  return (
    <div className="container mx-auto px-6 py-24 animate-fade-in">
      <div className="text-center mb-20 space-y-4">
        <h1 className="text-6xl md:text-8xl font-boldonse tracking-tighter bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          {t('CATALOG.MAIN_TITLE')}
        </h1>
        <p className="text-xl opacity-50 font-medium max-w-2xl mx-auto">
          Explora nuestra colección exclusiva diseñada para el confort y el estilo urbano de alto rendimiento.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-16">
        <aside className="lg:w-1/4">
          <Filter setFilter={setFilter} filter={filter} />
        </aside>
        <main className="lg:w-3/4">
          <CatalogMain 
            products={products} 
            currentPage={currentPage} 
            totalPages={totalPages} 
            setCurrentPage={setCurrentPage} 
          />
        </main>
      </div>
    </div>
  );
};