import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";

interface ThemeContextValue {
  darkMode: boolean;
  toggleTheme: () => void;
}

const AppThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("coltis.theme") !== "light"
  );

  const value = useMemo(() => ({
    darkMode,
    toggleTheme: () => {
      setDarkMode(current => {
        const next = !current;
        localStorage.setItem("coltis.theme", next ? "dark" : "light");
        return next;
      });
    }
  }), [darkMode]);

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error("useAppTheme debe utilizarse dentro de AppThemeProvider.");
  }
  return context;
}
