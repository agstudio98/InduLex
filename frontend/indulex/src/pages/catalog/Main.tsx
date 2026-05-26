import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { X, CheckCircle, Plus, CreditCard, Shirt, ChevronLeft, ChevronRight, Truck, Store, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface MainProps {
  products: any[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (p: number) => void;
}

/**
 * Main (Catalog Grid) Component
 * 
 * Displays a paginated grid of products and handles individual product interactions.
 * Features:
 * - Product card rendering with hover effects
 * - Integration with CartContext and AuthContext
 * - Buy Modal for individual product quick-purchase or add-to-cart
 * - Pagination controls
 * 
 * @param {Object} props - Component props
 * @param {any[]} props.products - List of products to display for the current page
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages available
 * @param {Function} props.setCurrentPage - Function to change the current page
 * @returns {JSX.Element} The rendered product grid and pagination
 */
export const Main = ({ products, currentPage, totalPages, setCurrentPage }: MainProps) => {
  const { t } = useTranslation();
  const { user, isLoggedIn } = useAuth();
  const { addToCart, openCheckout } = useCart();
  const { showToast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleProductClick = (p: any) => {
    if (!isLoggedIn) {
      showToast('error', 'Debe registrarse para continuar');
      return;
    }
    setSelectedProduct(p);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart({
        id: selectedProduct.id.toString(),
        nombre: t(selectedProduct.nameKey),
        precio: selectedProduct.price,
        imagen: '',
        quantity: 1
      });
      showToast('success', 'Producto añadido al carrito');
      setSelectedProduct(null);
    }
  };

  const initIndividualCheckout = () => {
    if (selectedProduct) {
      openCheckout({
        isCart: false,
        items: [{ ...selectedProduct, quantity: 1 }],
        total: selectedProduct.price
      });
      setSelectedProduct(null);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in-up">
      {products.length === 0 ? (
        <div className="text-center py-20 glass rounded-[2.5rem] opacity-50 font-bold">
          {t('CATALOG.NO_PRODUCTS')}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {products.map((p) => (
            <div 
              key={p.id} 
              className="glass p-8 rounded-[2.5rem] cursor-pointer group hover:scale-[1.02] transition-all duration-500 shadow-2xl border-white/10"
              onClick={() => handleProductClick(p)}
            >
              <div className="h-64 mb-8 rounded-3xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                <Shirt className="text-white opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" size={120} strokeWidth={1} />
              </div>
              <div className="space-y-3">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 opacity-70">{p.category}</div>
                <h3 className="text-2xl font-figtree font-black tracking-tight leading-tight">{t(p.nameKey)}</h3>
                <p className="text-3xl font-black text-white/90 font-figtree">${p.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 py-16">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-4 rounded-2xl glass hover:bg-blue-600/10 disabled:opacity-20 transition-all cursor-pointer group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button 
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`w-14 h-14 rounded-2xl font-black transition-all ${
                  currentPage === n 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-110' 
                    : 'glass hover:bg-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-4 rounded-2xl glass hover:bg-blue-600/10 disabled:opacity-20 transition-all cursor-pointer group"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* BuyModal.tsx Logic Integrated */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass p-10 rounded-[3rem] max-w-md w-full relative border-white/10 shadow-2xl space-y-8">
            <button 
              className="absolute top-6 right-6 p-2 glass hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setSelectedProduct(null)}
            >
              <X size={24} />
            </button>
            
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto rounded-3xl bg-blue-500/10 flex items-center justify-center">
                <Shirt className="text-blue-400" size={64} />
              </div>
              <div>
                <h2 className="text-3xl font-figtree font-black tracking-tight">{t(selectedProduct.nameKey)}</h2>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-400 opacity-70 mt-2">{selectedProduct.category}</p>
              </div>
              <div className="text-5xl font-black text-white">${selectedProduct.price.toFixed(2)}</div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={initIndividualCheckout}
                className="w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-95"
              >
                <CreditCard size={22} /> Comprar Ahora
              </button>
              <button 
                onClick={handleAddToCart}
                className="w-full py-5 rounded-2xl glass border-blue-500/30 text-blue-400 font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-500/10 transition-all"
              >
                <Plus size={22} /> Agregar al Carrito
              </button>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-full py-2 text-sm font-bold opacity-40 hover:opacity-100 transition-opacity"
              >
                Tal vez más tarde
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};