import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './theme-context';

const STORAGE_KEY = 'pruffo-theme';

function getSavedTheme() {
  try {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
  } catch (error) {
    console.error('Unable to read the saved theme preference.', error);
    return null;
  }
}

function getSystemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme() {
  return getSavedTheme() ?? getSystemTheme();
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = theme;
  }, [isDark, theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');

    function handleSystemThemeChange(event) {
      if (getSavedTheme() === null) {
        setTheme(event.matches ? 'dark' : 'light');
      }
    }

    function handleStorageChange(event) {
      if (event.key === STORAGE_KEY || event.key === null) {
        setTheme(getSavedTheme() ?? getSystemTheme());
      }
    }

    mediaQuery?.addEventListener('change', handleSystemThemeChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      mediaQuery?.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch (error) {
      console.error('Unable to save the theme preference.', error);
    }

    setTheme(nextTheme);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, isDark, toggleTheme }),
    [theme, isDark, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
