import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if a user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      // Optionally, you could decode the token here to get user info
      // For now, we assume the token indicates a logged-in state
      setUser({ token,userId }); // Placeholder for user info
    }
  }, []);

  // Login function
  const login = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setUser({token,userId});
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
