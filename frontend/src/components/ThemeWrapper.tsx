'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { useEffect } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
