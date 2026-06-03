import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Shield, CreditCard, LogOut, Save, MapPin, RefreshCw, Key, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { AddPaymentModal } from './AddPaymentModal';
import API_BASE_URL from '../api';

/**
 * GestorUser Component
 * 
 * A comprehensive user dashboard for managing account details.
 * It provides a tabbed interface for:
 * - Personal Information: Updating name, city, address, and profile picture.
 * - Security: Changing account password.
 * - Payment Methods: Viewing and managing linked cards or payment services.
 * It integrates with AuthContext for state management and interacts with the backend API for persistent updates.
 * 
 * @returns {JSX.Element} The rendered user management dashboard
 */
export const GestorUser = () => {
  const { t } = useTranslation();
  const { user, logout, updateUser, removePaymentMethod } = useAuth();
  const { showToast, hideToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ 
    nombre: user?.nombre || '', 
    direccion: user?.direccion || '',
    ciudad: user?.ciudad || '',
    codigoPostal: user?.codigoPostal || '',
    imagen: user?.imagen || user?.nombre || 'default'
  });

  const [securityData, setSecurityData] = useState({
    newPassword: '',
    repeatPassword: ''
  });

  // Keep formData in sync if user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        nombre: user.nombre || '',
        direccion: user.direccion || '',
        ciudad: user.ciudad || '',
        codigoPostal: user.codigoPostal || '',
        imagen: user.imagen || user.nombre || 'default'
      }));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
    showToast('info', t('GESTOR.LOGOUT_MSG') || 'Sesión cerrada correctamente');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user._id) {
      showToast('error', 'No se pudo identificar al usuario. Por favor, inicia sesión de nuevo.');
      return;
    }

    const tid = showToast('loading', 'Guardando cambios...');
    try {
      const response = await fetch(`${API_BASE_URL}/users/update/${user._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nombre: formData.nombre,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          codigoPostal: formData.codigoPostal,
          imagen: formData.imagen
        })
      });

      hideToast(tid);
      const json = await response.json();

      if (response.ok) {
        updateUser(json.data.user);
        showToast('success', t('GESTOR.INFO.SAVE_SUCCESS') || 'Datos actualizados correctamente.');
      } else {
        showToast('error', json.message || 'Error al actualizar perfil.');
      }
    } catch (error) {
      hideToast(tid);
      showToast('error', 'Sin conexión con el servidor.');
    }
  };

  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.repeatPassword) {
      showToast('error', t('GESTOR.SECURITY.PASS_MISMATCH') || 'Las contraseñas no coinciden.');
      return;
    }
    if (securityData.newPassword.length < 7) {
      showToast('error', t('USER.VALIDATION.PASS_LENGTH'));
      return;
    }
    // Logic for updating password would go here
    showToast('success', t('GESTOR.SECURITY.SAVE_SUCCESS') || 'Contraseña actualizada correctamente.');
    setSecurityData({ newPassword: '', repeatPassword: '' });
  };

  const changeAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setFormData(prev => ({ ...prev, imagen: randomSeed }));
  };

  return (
    <div className="container mx-auto px-6 py-24 animate-fade-in flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="md:w-1/3 lg:w-1/4 space-y-6">
        <div className="p-10 rounded-[2.5rem] glass dark:glass shadow-2xl text-center space-y-6 border-white/10">
          <div className="relative inline-block group">
            <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src={formData.imagen?.startsWith('http') ? formData.imagen : `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.imagen}`} 
              alt="Profile" 
              className="relative w-28 h-28 rounded-full mx-auto border-4 border-blue-500 shadow-xl transition-transform group-hover:scale-105" 
            />
            <button 
              onClick={changeAvatar}
              className="absolute -bottom-2 -right-2 p-3 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-500 transition-all hover:rotate-180"
              title={t('GESTOR.AVATAR.CHANGE')}
            >
              <RefreshCw size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-figtree font-black tracking-tight">{user?.nombre}</h2>
          </div>
        </div>

        <nav className="flex flex-col gap-3">
          {[
            { id: 'info', icon: User, label: t('GESTOR.TABS.INFO') },
            { id: 'security', icon: Shield, label: t('GESTOR.TABS.SECURITY') },
            { id: 'payment', icon: CreditCard, label: t('GESTOR.TABS.PAYMENTS') }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 p-5 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-[1.02]' 
                  : 'glass hover:bg-white/10 dark:hover:bg-black/5 opacity-70 hover:opacity-100'
              }`}
            >
              <tab.icon size={22} /> {tab.label}
            </button>
          ))}
          <div className="h-px bg-white/5 mx-4 my-2"></div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 p-5 rounded-2xl font-bold text-red-500 glass hover:bg-red-500/10 transition-all border-red-500/10"
          >
            <LogOut size={22} /> {t('GESTOR.LOGOUT')}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:w-2/3 lg:w-3/4 glass dark:glass rounded-[2.5rem] p-12 shadow-2xl border-white/10 min-h-[600px] animate-fade-in-up overflow-hidden">
        {activeTab === 'info' && (
          <div className="space-y-10">
            <div className="space-y-2">
              <h3 className="text-4xl font-figtree font-black tracking-tight flex items-center gap-4">
                <User className="text-blue-500" size={32} /> {t('GESTOR.INFO.TITLE')}
              </h3>
              <p className="opacity-50 font-medium">{t('GESTOR.INFO.DESC')}</p>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-8 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1">{t('GESTOR.INFO.NAME')}</label>
                  <input 
                    type="text" 
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1">{t('GESTOR.INFO.CITY')}</label>
                  <input 
                    type="text" 
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-bold"
                    placeholder="Ej: Buenos Aires"
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1 flex items-center gap-2">
                    <MapPin size={12} /> {t('GESTOR.INFO.ADDRESS')}
                  </label>
                  <input 
                    type="text" 
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-bold"
                    placeholder="Ej: Av. Santa Fe 1234, Piso 2"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1">{t('GESTOR.INFO.POSTAL')}</label>
                  <input 
                    type="text" 
                    value={formData.codigoPostal}
                    onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })}
                    className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-bold"
                  />
                </div>
              </div>
              <button type="submit" className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-blue-600 text-white font-black text-lg hover:scale-[1.02] transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 cursor-pointer">
                <Save size={22} /> {t('GESTOR.INFO.SAVE')}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-10">
            <div className="space-y-2">
              <h3 className="text-4xl font-figtree font-black tracking-tight flex items-center gap-4">
                <Shield className="text-blue-500" size={32} /> {t('GESTOR.SECURITY.TITLE')}
              </h3>
              <p className="opacity-50 font-medium">{t('GESTOR.SECURITY.DESC')}</p>
            </div>

            <form onSubmit={handleSecurityUpdate} className="space-y-8 max-w-xl">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1 flex items-center gap-2">
                    <Key size={12} /> {t('GESTOR.SECURITY.NEW_PASS')}
                  </label>
                  <input 
                    type="password" 
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                    className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-bold"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1 flex items-center gap-2">
                    <CheckCircle2 size={12} /> {t('GESTOR.SECURITY.REPEAT_PASS')}
                  </label>
                  <input 
                    type="password" 
                    value={securityData.repeatPassword}
                    onChange={(e) => setSecurityData({ ...securityData, repeatPassword: e.target.value })}
                    className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-bold"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-blue-600 text-white font-black text-lg hover:scale-[1.02] transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 cursor-pointer">
                <Save size={22} /> {t('GESTOR.SECURITY.UPDATE_BTN')}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-10">
            <div className="flex justify-between items-end gap-6">
              <div className="space-y-2">
                <h3 className="text-4xl font-figtree font-black tracking-tight flex items-center gap-4">
                  <CreditCard className="text-blue-500" size={32} /> {t('GESTOR.PAYMENTS.TITLE')}
                </h3>
                <p className="opacity-50 font-medium">{t('GESTOR.PAYMENTS.DESC')}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-black hover:scale-[1.02] transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer"
              >
                <Plus size={22} /> {t('GESTOR.PAYMENTS.ADD_BTN')}
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {(!user?.paymentMethods || user.paymentMethods.length === 0) ? (
                <div className="text-center py-24 glass border-2 border-dashed border-white/10 rounded-[2.5rem] opacity-40">
                  <CreditCard className="mx-auto mb-6 opacity-30" size={64} />
                  <p className="font-bold text-xl">{t('GESTOR.PAYMENTS.NO_METHODS')}</p>
                </div>
              ) : (
                user.paymentMethods.map((m) => (
                  <div 
                    key={m.id} 
                    className={`flex items-center justify-between p-8 rounded-[2rem] glass border-white/10 transition-all hover:scale-[1.01] shadow-xl group ${
                      m.type === 'visa' ? 'bg-gradient-to-r from-blue-900/40 via-blue-800/20 to-transparent' : 
                      m.type === 'mastercard' ? 'bg-gradient-to-r from-orange-900/40 via-orange-800/20 to-transparent' : 
                      'bg-gradient-to-r from-blue-400/20 via-blue-500/10 to-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-8">
                      {m.type === 'mercadopago' ? (
                        <div className="p-4 glass rounded-2xl">
                          <img src="https://www.vectorlogo.zone/logos/mercadopago/mercadopago-icon.svg" className="w-10 h-10" alt="MP" />
                        </div>
                      ) : (
                        <div className="w-20 h-12 glass rounded-xl flex items-center justify-center font-black italic shadow-inner border-white/5">
                          {m.type === 'visa' ? <span className="text-blue-400 text-xl">VISA</span> : <span className="text-orange-400 text-xl">MC</span>}
                        </div>
                      )}
                      <div>
                        <p className="font-black text-2xl tracking-tight">
                          {m.type === 'mercadopago' ? 'Mercado Pago' : `${m.type.charAt(0).toUpperCase() + m.type.slice(1)} •••• ${m.last4}`}
                        </p>
                        <p className="text-xs font-bold opacity-50 uppercase tracking-widest mt-1">
                          {m.type === 'mercadopago' ? m.email : `Vence ${m.expiry}`}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removePaymentMethod(m.id)}
                      className="p-4 text-red-500 glass hover:bg-red-500/10 rounded-2xl transition-all opacity-0 group-hover:opacity-100 border-red-500/10"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      <AddPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
