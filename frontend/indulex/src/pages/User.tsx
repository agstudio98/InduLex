import { useTranslation } from 'react-i18next';
import { Form } from './user/Form';

/**
 * User Auth Page Component
 * 
 * Serves as the entry point for user authentication (Login and Registration).
 * It houses the authentication `Form` component.
 * 
 * @returns {JSX.Element} The rendered authentication page
 */
export const User = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-6 py-10 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full animate-fade-in">
        <h1 className="text-5xl font-boldonse mb-10 text-center">{t('USER.LOGIN_TITLE')}</h1>
        <Form />
      </div>
    </div>
  );
};