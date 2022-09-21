import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuth: false,
  });

  const isAuthenticated = async (token: string) => {
    return await fetch(apiURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
