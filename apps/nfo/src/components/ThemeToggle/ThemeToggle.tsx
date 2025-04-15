

import { useTheme } from "@/theme/useTheme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
    </button>
  );
}