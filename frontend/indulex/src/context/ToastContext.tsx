import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'loading';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string) => string;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * ToastProvider Component
 * 
 * Manages global application notifications (Toasts).
 * Supports different types: success, error, info, and loading.
 * Features:
 * - Auto-dismissing toasts (except loading)
 * - Prevents duplicate loading indicators
 * - Glassmorphism floating UI for notifications
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} The provider component with the toast UI overlay
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts((prev) => {
      // If we are showing a new loading toast, remove previous loading toasts to avoid duplicates
      if (type === 'loading') {
        return [...prev.filter(t => t.type !== 'loading'), { id, type, message }];
      }
      return [...prev, { id, type, message }];
    });
    
    if (type !== 'loading') {
      setTimeout(() => hideToast(id), 4000);
    }
    return id;
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div 
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl animate-in slide-in-from-right duration-300 ${
              t.type === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-200' :
              t.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-200' :
              t.type === 'loading' ? 'bg-blue-500/20 border-blue-500/50 text-blue-200' :
              'bg-white/10 border-white/20 text-white'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 size={20} />}
            {t.type === 'error' && <AlertCircle size={20} />}
            {t.type === 'info' && <Info size={20} />}
            {t.type === 'loading' && <Loader2 size={20} className="animate-spin" />}
            
            <p className="font-medium">{t.message}</p>
            
            {t.type !== 'loading' && (
              <button onClick={() => hideToast(t.id)} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * useToast Hook
 * 
 * Custom hook to access the notification system.
 * Must be used within a ToastProvider.
 * 
 * @returns {ToastContextType} Functions to show and hide toasts
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};