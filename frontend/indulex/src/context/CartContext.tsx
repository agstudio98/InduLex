import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  isCheckoutOpen: boolean;
  checkoutData: any;
  openCheckout: (data: any) => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider Component
 * 
 * Manages the global shopping cart and checkout state.
 * Features:
 * - Adding/Removing items from the cart
 * - Automatic total calculation
 * - Managing checkout modal visibility and data
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} The provider component
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, i) => acc + i.precio * i.quantity, 0);

  const openCheckout = (data: any) => {
    setCheckoutData(data);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutData(null);
  };

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, clearCart, total,
      isCheckoutOpen, checkoutData, openCheckout, closeCheckout
    }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * useCart Hook
 * 
 * Custom hook to access the cart and checkout context.
 * Must be used within a CartProvider.
 * 
 * @returns {CartContextType} The cart state and management functions
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};