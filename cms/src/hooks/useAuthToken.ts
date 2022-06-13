import { useEffect, useState } from 'react';

export default function useAuthToken(): [
  token: string | null,
  saveToken: typeof saveToken,
  resetToken: typeof resetToken,
] {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const fromLocalStorage = localStorage.getItem('token');

    if (fromLocalStorage) {
      setToken(JSON.parse(fromLocalStorage).value);
    } else {
      setToken(null);
    }
  }, []);

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
