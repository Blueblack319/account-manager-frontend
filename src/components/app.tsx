import React, { useEffect, useRef } from 'react';
import { LoggedOutRouter } from '../routers/logged-out-router';
import { useAuthActions, useAuthState } from '../utils/context/authContext';
import { LoggedInRouter } from '../routers/logged-in-router';

function App() {
  const { isLoggedIn } = useAuthState();
  const { logout } = useAuthActions();
  const logoutTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const expiration = localStorage.getItem('tokenExp');
    if (isLoggedIn && expiration && new Date(expiration) > new Date()) {
      const newExp = new Date(new Date().getTime() + 60 * 1000 * 60);
      localStorage.setItem('tokenExp', newExp.toISOString());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const expiration = localStorage.getItem('tokenExp');
    if (isLoggedIn && expiration) {
      const expirationDate = new Date(expiration);
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      logoutTimer.current = setTimeout(logout, remainingTime);
      return () => clearTimeout(logoutTimer.current as NodeJS.Timeout);
    }
  }, [logout, isLoggedIn]);

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
