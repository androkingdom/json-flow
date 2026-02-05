'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Theme, ThemeContextType } from '@/features/shared/types/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'jsonflow-theme';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [systemTheme, setSystemTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore localStorage errors
    }
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Get stored theme or fall back to dark default
    const storedTheme = getStoredTheme();
    const systemPref = getSystemTheme();

    setSystemTheme(systemPref);
    
    if (storedTheme) {
      setThemeState(storedTheme);
      applyTheme(storedTheme);
    } else {
      setThemeState('dark');
      applyTheme('dark');
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const newSystemTheme = mediaQuery.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value: ThemeContextType = {
    theme,
    systemTheme,
    setTheme,
    toggleTheme,
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <ThemeContext.Provider value={value}>
        <div suppressHydrationWarning>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
