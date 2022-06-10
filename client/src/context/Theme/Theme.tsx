import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { ThemeProvider } from 'styled-components';

export default function Theme({
  children,
}: {
  children?: React.ReactNode;
}) {
  const theme = useContext(ThemeContext);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
