import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShoppingBag, User as UserIcon, Globe, Sun, Moon, MessageSquare, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartModal } from './CartModal';

/**
 * Props for the Navbar component
 * @interface NavbarProps
 * @property {Function} toggleMode - Callback to switch between light and night mode
 * @property {boolean} isNightMode - Current theme state
 */
interface NavbarProps {
  toggleMode: () => void;
  isNightMode: boolean;
}

/**
 * Navbar Component
 * 
 * The primary navigation bar for InduLex. 
 * Features include:
 * - Dynamic links based on authentication state
 * - Shopping cart access with item counter
 * - User profile access and avatar display
 * - Language switching (i18n)
 * - Dark/Light mode toggle
 * 
 * @param {NavbarProps} props - Component props
 * @returns {JSX.Element} The rendered navigation bar
 */
export const Navbar = ({ toggleMode, isNightMode }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const { user, isLoggedIn } = useAuth();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const changeLanguage = () => {
    const nextLng = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLng);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 glass dark:glass p-4 transition-all duration-500 border-none shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold font-boldonse tracking-tighter hover:scale-105 transition-transform bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            InduLex
          </Link>

          <div className="flex items-center space-x-2 md:space-x-8">
            <Link to="/catalog" className="hidden sm:flex items-center space-x-2 font-bold text-sm opacity-70 hover:opacity-100 hover:text-blue-500 transition-all">
              <ShoppingBag size={18} />
              <span className="hidden md:inline uppercase tracking-widest text-[10px]">{t('NAVBAR.CATALOG')}</span>
            </Link>

            <Link to="/support" className="flex items-center space-x-2 font-bold text-sm opacity-70 hover:opacity-100 hover:text-blue-500 transition-all">
              <MessageSquare size={18} />
              <span className="hidden md:inline uppercase tracking-widest text-[10px]">{t('SUPPORT.TITLE')}</span>
            </Link>

            <div className="h-6 w-px bg-white/10 dark:bg-black/5 mx-2 hidden md:block"></div>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 glass hover:bg-blue-500/10 rounded-xl transition-all cursor-pointer group"
                >
                  <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black shadow-lg shadow-blue-500/40">
                      {cart.length}
                    </span>
                  )}
                </button>
                <Link to="/profile" className="flex items-center space-x-3 p-1 pr-4 rounded-2xl glass hover:bg-blue-500/10 transition-all border-white/10 dark:border-black/5">
                  <div className="w-9 h-9 rounded-xl overflow-hidden shadow-inner bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <img 
                      src={user?.imagen?.startsWith('http') ? user.imagen : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.imagen || user?.nombre}`} 
                      alt="User" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="hidden md:inline text-xs font-black tracking-tight">{user?.nombre}</span>
                </Link>
              </div>
            ) : (
              <Link to="/user" className="flex items-center space-x-2 font-bold text-sm opacity-70 hover:opacity-100 hover:text-blue-500 transition-all">
                <UserIcon size={18} />
                <span className="hidden md:inline uppercase tracking-widest text-[10px]">{t('NAVBAR.LOGIN')}</span>
              </Link>
            )}

            <div className="flex items-center gap-2">
              <button onClick={changeLanguage} className="p-2.5 glass rounded-xl hover:bg-blue-500/10 transition-all cursor-pointer">
                <Globe size={18} />
              </button>

              <button onClick={toggleMode} className="p-2.5 glass rounded-xl hover:bg-blue-500/10 transition-all cursor-pointer group">
                {isNightMode ? <Sun size={18} className="text-yellow-400 group-hover:rotate-45 transition-transform" /> : <Moon size={18} className="text-blue-400 group-hover:-rotate-12 transition-transform" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};