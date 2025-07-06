'use client';


import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder that matches the expected DOM structure
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      
      themes={['light', 'dark', 'system']}
      storageKey="quote-generator-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}