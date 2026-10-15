import { useLanguage } from '../context/useLanguage';

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div aria-label={t.language.label} className="flex rounded-full bg-zinc-200 p-1 text-xs font-semibold dark:bg-zinc-900 dark:ring-1 dark:ring-zinc-800" role="group">
      {['EN', 'DE', 'GE'].map((option) => (
        <button
          aria-pressed={language === option}
          className={`rounded-full px-3 py-1 transition-colors ${
            language === option
              ? 'bg-[#d4af37] font-bold text-black'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
          key={option}
          onClick={() => setLanguage(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
