"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 border-b border-gray-200 mb-8">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          OWASP Route
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/chapters"
                className="text-gray-600 hover:text-gray-800"
              >
                Chapters
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="text-gray-600 hover:text-gray-800"
              >
                Events
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
