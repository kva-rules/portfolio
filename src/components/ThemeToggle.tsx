import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2 rounded-xl text-slate-600 hover:text-cyan-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-cyan-400 dark:hover:bg-slate-800/80 transition-all border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 cursor-pointer shadow-sm dark:shadow-none"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-300 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
