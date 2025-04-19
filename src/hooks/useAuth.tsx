import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../services/store/Store';

export const useAuth = () => {
  const loginToken = useSelector<RootState, string | null>((state) => state.login.accessToken);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("accessToken"));
  useEffect(() => {
    if (loginToken) {
      localStorage.setItem("accessToken", loginToken);
      setIsAuthenticated(true);
    } else {
      // const tokenInStorage = ;
      setIsAuthenticated(!!localStorage.getItem("accessToken"));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginToken]);

  return { isAuthenticated };
};
