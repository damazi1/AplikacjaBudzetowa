import React, {createContext, useContext, useEffect, useState} from "react";
import {NuqsAdapter} from "nuqs/adapters/next/pages";

const ThemeContext = createContext<{
  theme: string;
  toggleTheme: (value: "dark" | "light") => void;
}>({ theme: "light", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored && stored !== theme) setTheme(stored);
  }, []);const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <NuqsAdapter>{children}</NuqsAdapter>
    </ThemeContext.Provider>
  );
};