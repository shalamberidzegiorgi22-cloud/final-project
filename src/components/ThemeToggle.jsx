import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/useTheme';

export default function ThemeToggle({ showLabel = false }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const Icon = isDark ? Sun : Moon;
  const ariaLabel = isDark ? t.theme.switchToLight : t.theme.switchToDark;

  return (
    <button
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-2 rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
        showLabel
          ? 'px-3 py-1.5 text-xs font-medium dark:border-zinc-700 dark:bg-zinc-900 dark:text-amber-400 border-zinc-300 bg-white text-zinc-800'
          : 'p-2.5 dark:border-zinc-800 dark:bg-zinc-900 dark:text-amber-400 border-zinc-300 bg-white text-zinc-800'
      }`}
      onClick={toggleTheme}
      title={ariaLabel}
      type="button"
    >
      <Icon aria-hidden="true" size={showLabel ? 15 : 16} />
      {showLabel && <span>{isDark ? t.theme.dark : t.theme.light}</span>}
    </button>
  );
}
