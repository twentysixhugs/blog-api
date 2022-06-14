import React, { useContext } from 'react';
import { ThemeContext, IThemeContext } from './ThemeStore';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export default function Theme({
  children,
}: {
  children?: React.ReactNode;
}) {
  const theme = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      {children}
    </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  body,
  #root {
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  body {
    /* Fonts */
    --system-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-family: 'Nunito', var(--system-font);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Layout */
    --header-offset: 85px;

    /* Colors */
    --orange--dark: #ff975f;
    --text--dark: #e2e2e2;
    --border--dark: #3e3e3e;
    --orange--light: #e48729;


    background: ${({ theme }: { theme: IThemeContext }) =>
      theme.isDark ? '#181a1b' : 'none'};
  }


`;
