import React, { useContext } from 'react';
import { ThemeContext, IThemeContext } from './ThemeContext';
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
    margin: 0;
    font-size: 16px;

    --system-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    --header-offset: 85px;
    font-family: 'Nunito', var(--system-font);

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background: ${({ theme }: { theme: IThemeContext }) =>
      theme.isDark ? '#181a1b' : 'none'};
  }


`;
