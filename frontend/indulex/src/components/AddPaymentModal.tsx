import { useState } from 'react';
import { X, CreditCard, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * AddPaymentModal Component
 * 
 * A modal window that allows users to add a new payment method (Visa, Mastercard, or Mercado Pago).
 * It handles local form state for card details or email and dispatches the data to the AuthContext.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {Function} props.onClose - Function to close the modal and reset state
 * @returns {JSX.Element | null} The rendered modal or null if not open
 */
export const AddPaymentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { addPaymentMethod } = useAuth();
  const [type, setType] = useState<'visa' | 'mastercard' | 'mercadopago'>('visa');
  const [formData, setFormData] = useState({ number: '', expiry: '', email: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMethod: any = {
      id: Date.now().toString(),
      type,
    };

    if (type === 'mercadopago') {
      newMethod.email = formData.email;
    } else {
      newMethod.last4 = formData.number.slice(-4);
      newMethod.expiry = formData.expiry;
    }

    addPaymentMethod(newMethod);
    setFormData({ number: '', expiry: '', email: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-day-bg dark:bg-night-bg p-8 rounded-3xl max-w-md w-full relative border border-gray-700 shadow-2xl space-y-6">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full">
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="text-day-primary" /> Agregar Método
        </h3>

        <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
          {(['visa', 'mastercard', 'mercadopago'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-grow py-2 rounded-lg text-xs font-bold uppercase transition-all ${type === t ? 'bg-day-primary text-white shadow-lg' : 'opacity-50 hover:opacity-100'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'mercadopago' ? (
            <div>
              <label className="block text-sm opacity-60 mb-2">Email de Mercado Pago</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input 
                  type="email" 
                  className="w-full p-4 pl-12 rounded-xl bg-black/20 dark:bg-white/20 border border-gray-700 outline-none focus:ring-2 ring-day-primary"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm opacity-60 mb-2">Número de Tarjeta</label>
                <input 
                  type="text" 
                  maxLength={16}
                  placeholder="xxxx xxxx xxxx xxxx"
                  className="w-full p-4 rounded-xl bg-black/20 dark:bg-white/20 border border-gray-700 outline-none focus:ring-2 ring-day-primary"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value.replace(/\D/g, '') })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm opacity-60 mb-2">Vencimiento (MM/YY)</label>
                <input 
                  type="text" 
                  placeholder="12/28"
                  maxLength={5}
                  className="w-full p-4 rounded-xl bg-black/20 dark:bg-white/20 border border-gray-700 outline-none focus:ring-2 ring-day-primary"
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="w-full py-4 rounded-xl bg-day-primary text-white font-bold hover:scale-[1.02] transition-transform">
            Confirmar y Guardar
          </button>
        </form>
      </div>
    </div>
  );
};