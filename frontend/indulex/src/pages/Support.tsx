import { useTranslation } from 'react-i18next';
import { Chat } from './support/Chat';

/**
 * Support Page Component
 * 
 * Provides technical assistance and customer service resources.
 * Its primary feature is the interactive tag-based support chat.
 * 
 * @returns {JSX.Element} The rendered support page
 */
export const Support = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-6 py-10 animate-fade-in flex flex-col items-center">
      <h1 className="text-5xl font-boldonse mb-10 text-center">{t('SUPPORT.TITLE')}</h1>
      <div className="w-full max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">{t('SUPPORT.CHAT')}</h2>
          <Chat />
        </section>
      </div>
    </div>
  );
};
