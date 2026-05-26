import { useTranslation } from 'react-i18next';
import { ShoppingCart, X, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

/**
 * CartModal Component
 * 
 * An overlay sidebar that displays the current items in the user's shopping cart.
 * Users can view product details, adjust quantities (indirectly via context), 
 * remove items, and proceed to the checkout process.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls the visibility of the sidebar
 * @param {Function} props.onClose - Function to close the sidebar
 * @returns {JSX.Element | null} The rendered sidebar or null if not open
 */
export const CartModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useTranslation();
  const { cart, removeFromCart, total, openCheckout } = useCart();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleConfirm = () => {
    openCheckout({
      isCart: true,
      items: cart,
      total: total
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex justify-end animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-day-bg dark:bg-night-bg h-full p-8 shadow-2xl flex flex-col border-l border-gray-700 animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingCart /> Carrito
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto space-y-6">
          {cart.length === 0 ? (
            <p className="text-center opacity-50 mt-20">Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white/5 dark:bg-black/5 items-center group">
                <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h4 className="font-bold">{item.nombre}</h4>
                  <p className="text-sm opacity-60">x{item.quantity}</p>
                  <p className="font-bold text-day-primary">${item.precio * item.quantity}</p>
                </div>
                <button 
                  onClick={() => {
                    removeFromCart(item.id);
                    showToast('info', 'Producto eliminado');
                  }} 
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-700 pt-8 mt-8 space-y-4">
            <div className="flex justify-between text-2xl font-bold">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <button 
              className="w-full py-4 rounded-xl bg-day-primary dark:bg-night-primary text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer"
              onClick={handleConfirm}
            >
              <CreditCard size={20} /> Confirmar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};