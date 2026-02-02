"use client";
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId, showAuth, setShowAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
