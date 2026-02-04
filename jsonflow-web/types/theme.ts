export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  systemTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}