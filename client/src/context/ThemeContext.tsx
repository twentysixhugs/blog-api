import React, { useContext, useState } from 'react';

interface IThemeContext {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = React.createContext<IThemeContext>(
  {} as IThemeContext,
);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  const updateTheme = function () {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
