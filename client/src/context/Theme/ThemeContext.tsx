import React, { useContext, useState } from 'react';

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
