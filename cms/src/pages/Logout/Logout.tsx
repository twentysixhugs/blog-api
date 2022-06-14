import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../context/Token/TokenStore';

export default function Logout() {
  const [token, saveToken, resetToken] = useToken();

  const navigate = useNavigate();

  useEffect(() => {
    resetToken();
    navigate('/login');
  }, [resetToken, navigate]);

  return null;
}
