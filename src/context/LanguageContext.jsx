import { useCallback, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';
import { LanguageContext } from './language-context';

const STORAGE_KEY = 'pruffo-language';

function getInitialLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    return savedLanguage === 'DE' || savedLanguage === 'GE' || savedLanguage === 'EN' ? savedLanguage : 'EN';
  } catch (error) {
    console.error('Unable to read the saved language preference.', error);
    return 'EN';
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === STORAGE_KEY || event.key === null) {
        try {
          const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
          setLanguageState(savedLanguage === 'DE' || savedLanguage === 'GE' ? savedLanguage : 'EN');
        } catch (error) {
          console.error('Unable to read the saved language preference.', error);
        }
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setLanguage = useCallback((nextLanguage) => {
    if (nextLanguage !== 'EN' && nextLanguage !== 'DE' && nextLanguage !== 'GE') {
      throw new Error(`Unsupported language: ${nextLanguage}`);
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch (error) {
      console.error('Unable to save the language preference.', error);
    }

    setLanguageState(nextLanguage);
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, t: translations[language] }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
