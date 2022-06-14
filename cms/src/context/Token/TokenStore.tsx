import React, { useContext, useEffect, useState } from 'react';

export type IToken = [
  token: string | null,
  saveToken: (newToken: string) => void,
  resetToken: () => void,
];

const TokenContext = React.createContext<IToken>([] as unknown as IToken);

const useToken = function () {
  return useContext(TokenContext);
};

export { useToken };

export default function TokenStore({
  children,
}: {
  children: React.ReactNode;
}) {
  const fromLocalStorage = localStorage.getItem('token');

  const [token, setToken] = useState<null | string>(
    fromLocalStorage ? JSON.parse(fromLocalStorage).value : null,
  );

  function saveToken(token: string) {
    localStorage.setItem('token', JSON.stringify({ value: token }));
    setToken(token);
  }

  function resetToken() {
    localStorage.setItem('token', JSON.stringify({ value: null }));
    setToken(null);
  }

  return (
    <TokenContext.Provider value={[token, saveToken, resetToken]}>
      {children}
    </TokenContext.Provider>
  );
}
