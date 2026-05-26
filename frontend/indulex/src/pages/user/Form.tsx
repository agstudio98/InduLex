import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LogIn, UserPlus, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

/**
 * Auth Form Component
 * 
 * Handles both Login and User Registration processes.
 * Key Features:
 * - Dynamic form fields based on mode (Login vs. Register)
 * - Real-time password strength validation with visual feedback
 * - Integration with Google OAuth for social login
 * - Form submission to the backend API with comprehensive error handling
 * - Use of Context (Auth, Toast) for global state updates
 * 
 * @returns {JSX.Element} The rendered authentication form
 */
export const Form = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { showToast, hideToast } = useToast();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });

  // Validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordValidations = useMemo(() => ({
    length: formData.password.length >= 7 && formData.password.length <= 12,
    upper: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  }), [formData.password]);

  const passwordStrength = useMemo(() => {
    const values = Object.values(passwordValidations);
    const passed = values.filter(Boolean).length;
    if (passed <= 1) return { label: t('USER.VALIDATION.STRENGTH_WEAK'), color: 'bg-red-500', percent: 'w-1/3' };
    if (passed <= 3) return { label: t('USER.VALIDATION.STRENGTH_FAIR'), color: 'bg-yellow-500', percent: 'w-2/3' };
    return { label: t('USER.VALIDATION.STRENGTH_STRONG'), color: 'bg-green-500', percent: 'w-full' };
  }, [passwordValidations, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      if (!emailRegex.test(formData.email)) {
        showToast('error', t('USER.VALIDATION.INVALID_EMAIL'));
        return;
      }
      if (!Object.values(passwordValidations).every(Boolean)) {
        showToast('error', 'Por favor, cumple con todos los requisitos de seguridad.');
        return;
      }
    }

    const toastId = showToast('loading', isLogin ? 'Iniciando sesión...' : 'Creando tu cuenta...');
    const endpoint = isLogin ? 'login' : 'register';
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/users/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      hideToast(toastId);
      const json = await response.json();

      if (response.ok) {
        showToast('success', isLogin 
          ? `¡Hola de nuevo, ${json.data.user?.nombre}! Nos alegra verte.` 
          : '¡Registro completado con éxito! Ahora puedes iniciar sesión.');

        if (isLogin) {
          login(json.data.user);
          setTimeout(() => navigate('/'), 1500);
        } else {
          setIsLogin(true);
          setFormData({ nombre: '', email: '', password: '' });
        }
      } else {
        showToast('error', json.message || 'Error al procesar la solicitud.');
      }
    } catch (error) {
      hideToast(toastId);
      showToast('error', 'Sin conexión con el servidor.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const toastId = showToast('loading', 'Iniciando sesión con Google...');
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/users/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      hideToast(toastId);
      const json = await response.json();

      if (response.ok) {
        showToast('success', `¡Bienvenido, ${json.data.user?.nombre}!`);
        login(json.data.user);
        setTimeout(() => navigate('/'), 1500);
      } else {
        showToast('error', json.message || 'Error al autenticar con Google.');
      }
    } catch (error) {
      hideToast(toastId);
      showToast('error', 'Error al conectar con el servidor.');
    }
  };

  return (
    <div className="p-10 rounded-[2.5rem] glass dark:glass shadow-2xl space-y-8 border-white/20 dark:border-black/5">
      <div className="text-center">
        <h2 className="text-3xl font-figtree font-black mb-2 tracking-tight">
          {isLogin ? '¡Bienvenido!' : 'Únete a InduLex'}
        </h2>
        <p className="text-sm opacity-60">
          {isLogin ? 'Ingresa tus credenciales para continuar' : 'Completa el formulario para empezar'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1">{t('USER.NAME_LABEL')}</label>
            <input 
              type="text" 
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
          </div>
        )}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1">{t('USER.EMAIL_LABEL')}</label>
          <input 
            type="email" 
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1">{t('USER.PASSWORD_LABEL')}</label>
          <input 
            type="password" 
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          {!isLogin && formData.password && (
            <div className="pt-2 space-y-3 animate-fade-in">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="opacity-50">Seguridad</span>
                <span className={passwordStrength.color.replace('bg-', 'text-')}>{passwordStrength.label}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${passwordStrength.color} ${passwordStrength.percent} transition-all duration-500`}></div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold opacity-60">
                <div className={`flex items-center gap-1 ${passwordValidations.length ? 'text-green-500' : 'text-white/40'}`}>
                  {passwordValidations.length ? <CheckCircle2 size={12} /> : <XCircle size={12} />} 7-12 Caracteres
                </div>
                <div className={`flex items-center gap-1 ${passwordValidations.upper ? 'text-green-500' : 'text-white/40'}`}>
                  {passwordValidations.upper ? <CheckCircle2 size={12} /> : <XCircle size={12} />} Mayúscula
                </div>
                <div className={`flex items-center gap-1 ${passwordValidations.number ? 'text-green-500' : 'text-white/40'}`}>
                  {passwordValidations.number ? <CheckCircle2 size={12} /> : <XCircle size={12} />} Número
                </div>
                <div className={`flex items-center gap-1 ${passwordValidations.special ? 'text-green-500' : 'text-white/40'}`}>
                  {passwordValidations.special ? <CheckCircle2 size={12} /> : <XCircle size={12} />} Especial (!@#)
                </div>
              </div>
            </div>
          )}
        </div>

        <button 
          type="submit"
          className="w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer shadow-xl shadow-blue-500/20"
        >
          {isLogin ? <LogIn size={22} /> : <UserPlus size={22} />}
          {isLogin ? t('NAVBAR.LOGIN') : t('USER.REGISTER_BTN')}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
        <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
          <span className="bg-[#0a0a0a] px-4 opacity-40">O continuar con</span>
        </div>
      </div>

      <div className="flex justify-center">
        <GoogleLogin 
          onSuccess={handleGoogleSuccess} 
          onError={() => showToast('error', 'Error en la autenticación de Google')}
          theme="filled_black"
          shape="pill"
          size="large"
          text="continue_with"
          locale="es"
        />
      </div>

      <div className="flex justify-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
        >
          {isLogin ? t('USER.NO_ACCOUNT') : t('USER.ALREADY_ACCOUNT')}
        </button>
      </div>
    </div>
  );
};
