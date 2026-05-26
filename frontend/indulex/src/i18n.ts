import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: false,
    interpolation: {
      escapeValue: false, // React ya lo hace seguro por defecto
    },
    backend: {
      loadPath: '/src/assets/i18n/{{lng}}.json', // Ruta de los archivos json
    }
  });

export default i18n;