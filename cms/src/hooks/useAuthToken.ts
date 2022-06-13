import { useEffect, useState } from 'react';

export default function useAuthToken(): [
  token: string | null,
  saveToken: typeof saveToken,
  resetToken: typeof resetToken,
] {
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

  return [token, saveToken, resetToken];
}
