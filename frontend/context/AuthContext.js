import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState({
    isLoggedIn: false,
    token: null,
    name: null,
    email: null,
    role: null,
  });

  const setAuth = (authData) => {
    if (authData.isLoggedIn) {
      localStorage.setItem('token', authData.token); // Ensure token is being stored
      localStorage.setItem('tokenTimestamp', new Date().getTime());
      localStorage.setItem('name', authData.name);
      localStorage.setItem('email', authData.email);
      localStorage.setItem('role', authData.role);
    } else {
      clearAuth();
    }
    setAuthState(authData);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    const now = new Date().getTime();

    if (token && tokenTimestamp) {
      const elapsedTime = now - parseInt(tokenTimestamp, 10);
      const fiveHoursInMs = 5 * 60 * 60 * 1000;

      if (elapsedTime < fiveHoursInMs) {
        setAuth({
          isLoggedIn: true,
          token,
          name,
          email,
          role,
        });
      } else {
        clearAuth();
      }
    }
  }, []); // Load auth state on app initialization

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setAuthState({
      isLoggedIn: false,
      token: null,
      name: null,
      email: null,
      role: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
