// src/components/ThemeToggle.tsx
'use client'; // Bắt buộc để dùng Hooks

import { useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`px-4 py-2 rounded-md font-bold transition-colors ${
        isDark ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}