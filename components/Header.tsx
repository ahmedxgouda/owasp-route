'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 border-b border-gray-200 mb-8">
      <div className="container mx-auto flex justify-center items-center px-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
        {/* TODO: Add OWASP Logo and update README and update guidelines for contributing */}
          OWASP Route
        </Link>
      </div>
    </header>
  );
}
