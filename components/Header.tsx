'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const asyncMount = async () => {
      setMounted(true);
    };
    asyncMount();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="w-full py-6 border-b border-gray-200 dark:border-gray-700 mb-8 animate-fade-in">
      <div className="container mx-auto flex justify-between items-center px-4 max-w-6xl">
        <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform">
          OWASP Route
        </Link>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
