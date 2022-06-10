import React, { useContext, useEffect, useState } from 'react';

export interface IThemeContext {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = React.createContext<IThemeContext>(
  {} as IThemeContext,
);

const useTheme = function () {
  return useContext(ThemeContext);
};

function ThemeStore({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme');

    if (!localStorageTheme) {
      localStorage.setItem('theme', JSON.stringify({ isDark: false }));
      return;
    }

    setIsDark(JSON.parse(localStorageTheme).isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify({ isDark }));
  }, [isDark]);

  const toggle = function () {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeStore, useTheme };
