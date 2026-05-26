import React, { createContext, useContext, useState, useEffect } from 'react';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'mercadopago';
  last4?: string;
  email?: string;
  expiry?: string;
}

interface User {
  _id: string;
  nombre: string;
  email: string;
  imagen?: string;
  direccion?: string;
  ciudad?: string;
  codigoPostal?: string;
  paymentMethods?: PaymentMethod[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * 
 * Manages the global authentication state.
 * It handles user sessions by persisting user data to localStorage.
 * Features:
 * - Login/Logout functionality
 * - Profile information updates
 * - Payment method management (Add/Remove)
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} The provider component
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('indulex_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    const userWithPayments = { ...userData, paymentMethods: userData.paymentMethods || [] };
    setUser(userWithPayments);
    localStorage.setItem('indulex_user', JSON.stringify(userWithPayments));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('indulex_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('indulex_user', JSON.stringify(updatedUser));
    }
  };

  const addPaymentMethod = (method: PaymentMethod) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        paymentMethods: [...(user.paymentMethods || []), method] 
      };
      setUser(updatedUser);
      localStorage.setItem('indulex_user', JSON.stringify(updatedUser));
    }
  };

  const removePaymentMethod = (id: string) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        paymentMethods: (user.paymentMethods || []).filter(m => m.id !== id) 
      };
      setUser(updatedUser);
      localStorage.setItem('indulex_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn: !!user, 
      login, 
      logout, 
      updateUser, 
      addPaymentMethod, 
      removePaymentMethod 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth Hook
 * 
 * Custom hook to access the authentication context.
 * Must be used within an AuthProvider.
 * 
 * @returns {AuthContextType} The authentication state and management functions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};