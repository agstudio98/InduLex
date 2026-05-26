import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { X, CheckCircle, CreditCard, Shirt, Truck, Store, Wallet, AlertTriangle, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

/**
 * CheckoutModal Component
 * 
 * A full-screen modal that manages the final stages of a purchase.
 * It allows users to select shipping methods (Pickup or Delivery), 
 * verify their shipping address, and choose a payment method.
 * Includes an order summary and handles the mock transaction process.
 * 
 * @returns {JSX.Element | null} The rendered checkout modal or null if not in checkout mode
 */
export const CheckoutModal = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isCheckoutOpen, checkoutData, closeCheckout, clearCart } = useCart();
  const { showToast, hideToast } = useToast();
  const [shipping, setShipping] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('visa');

  useEffect(() => {
    if (checkoutData?.paymentMethod) {
      setPaymentMethod(checkoutData.paymentMethod);
    } else if (user?.paymentMethods?.[0]) {
      setPaymentMethod(user.paymentMethods[0].type);
    }
  }, [checkoutData, user]);

  if (!isCheckoutOpen || !checkoutData) return null;

  const processPurchase = async () => {
    // Validation for shipping address
    if (shipping === 'delivery' && !user?.direccion) {
      showToast('error', 'Coloque dirección de envío en su información personal para continuar.');
      return;
    }

    const tid = showToast('loading', 'Validando transacción segura...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    hideToast(tid);
    showToast('success', '¡Transacción exitosa! Tu pedido está en camino.');
    if (checkoutData.isCart) clearCart();
    closeCheckout();
  };

  const deliveryFee = shipping === 'delivery' ? 15 : 0;
  const finalTotal = checkoutData.total + deliveryFee;

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 backdrop-blur-xl animate-in zoom-in duration-300 overflow-y-auto">
      <div className="glass p-8 md:p-16 rounded-[3.5rem] max-w-4xl w-full border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] my-8 relative">
        <button onClick={closeCheckout} className="absolute top-8 right-8 p-3 glass rounded-full hover:bg-white/10 transition-all">
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side: Options */}
          <div className="lg:w-3/5 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Wallet className="text-white" size={28} />
              </div>
              <h2 className="text-4xl font-figtree font-black tracking-tight">Finalizar Compra</h2>
            </div>

            {/* Shipping Method */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.2em] opacity-40 ml-1">Método de Entrega</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setShipping('pickup')}
                  className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${shipping === 'pickup' ? 'bg-blue-600/10 border-blue-500 shadow-lg' : 'glass border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <Store className={shipping === 'pickup' ? 'text-blue-400' : ''} />
                  <div className="text-left">
                    <p className="font-bold">Retiro en Local</p>
                    <p className="text-[10px] opacity-50 uppercase font-black tracking-widest">Gratis - Hoy</p>
                  </div>
                </button>
                <button 
                  onClick={() => setShipping('delivery')}
                  className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${shipping === 'delivery' ? 'bg-blue-600/10 border-blue-500 shadow-lg' : 'glass border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <Truck className={shipping === 'delivery' ? 'text-blue-400' : ''} />
                  <div className="text-left">
                    <p className="font-bold">Envío a Domicilio</p>
                    <p className="text-[10px] opacity-50 uppercase font-black tracking-widest">$15.00 - 48hs</p>
                  </div>
                </button>
              </div>

              {shipping === 'delivery' && (
                <div className={`mt-4 p-5 rounded-2xl border-2 flex items-start gap-4 animate-fade-in ${user?.direccion ? 'bg-white/5 border-white/10' : 'bg-red-500/10 border-red-500/50'}`}>
                  {user?.direccion ? (
                    <>
                      <MapPin className="text-blue-500 mt-1" size={20} />
                      <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-widest opacity-40">Enviar a:</p>
                        <p className="font-bold">{user.direccion}</p>
                        <p className="text-xs opacity-60">{user.ciudad} {user.codigoPostal ? `(${user.codigoPostal})` : ''}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="text-red-500 mt-1" size={20} />
                      <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-widest text-red-500">Dirección Faltante</p>
                        <p className="text-sm font-bold opacity-80">Por favor, cargue su dirección en el Gestor de Usuario.</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.2em] opacity-40 ml-1">Medio de Pago</label>
              <div className="grid grid-cols-1 gap-3">
                {['visa', 'mastercard', 'mercadopago'].map((method) => (
                  <button 
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-5 rounded-2xl glass border-2 transition-all flex items-center justify-between ${paymentMethod === method ? 'border-blue-500 bg-blue-600/5 shadow-inner' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 glass rounded flex items-center justify-center font-black italic text-[10px] border-white/5">
                        {method.toUpperCase()}
                      </div>
                      <span className="font-black capitalize tracking-tight text-lg">{method}</span>
                    </div>
                    {paymentMethod === method && <CheckCircle size={22} className="text-blue-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Summary */}
          <div className="lg:w-2/5">
            <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8 sticky top-0 shadow-2xl">
              <h3 className="text-2xl font-black font-figtree tracking-tight">Resumen del Pedido</h3>
              
              <div className="space-y-5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {checkoutData.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/5">
                        <Shirt size={20} className="text-blue-400 opacity-60" />
                      </div>
                      <div>
                        <p className="text-sm font-black tracking-tight leading-tight">{item.nombre || t(item.nameKey)}</p>
                        <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mt-1">Cant: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-black text-sm tracking-tighter">${(item.precio || item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/10"></div>

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-50">
                  <span>Subtotal</span>
                  <span>${checkoutData.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-50">
                  <span>Logística</span>
                  <span className={shipping === 'pickup' ? 'text-green-500' : ''}>{shipping === 'pickup' ? 'GRATIS' : '$15.00'}</span>
                </div>
                <div className="flex justify-between text-3xl font-black font-figtree pt-4 border-t border-white/5">
                  <span className="tracking-tighter">Total</span>
                  <span className="text-blue-500 tracking-tighter">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={processPurchase}
                className={`w-full py-6 rounded-2xl text-white font-black text-xl transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)] active:scale-95 group ${shipping === 'delivery' && !user?.direccion ? 'bg-gray-600 cursor-not-allowed opacity-50 shadow-none' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                <span className="flex items-center justify-center gap-3">
                  <CreditCard size={24} /> Confirmar Pago
                </span>
              </button>
              <button 
                onClick={closeCheckout}
                className="w-full py-2 text-xs font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity"
              >
                ← Seguir Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};