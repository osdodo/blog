import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className="group fixed top-8 right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-slate-200/70 bg-white/70 shadow-[0_20px_40px_-20px_rgba(59,130,246,0.4)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_55px_-25px_rgba(56,189,248,0.45)] sm:top-4 sm:right-4 sm:h-11 sm:w-11 dark:border-slate-700/60 dark:bg-slate-900/70 dark:shadow-[0_20px_45px_-25px_rgba(20,184,166,0.5)]"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <svg
        className="h-5 w-5 fill-current text-slate-600 transition-transform duration-500 group-hover:rotate-12 dark:text-slate-200"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={
            theme === 'light'
              ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
              : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
          }
        ></path>
      </svg>
    </div>
  );
}
