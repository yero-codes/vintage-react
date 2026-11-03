import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Пытаемся взять пользователя из localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vintage-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Сохраняем данные пользователя при изменении
  useEffect(() => {
    if (user) {
      localStorage.setItem('vintage-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vintage-user');
    }
  }, [user]);

  // Функция входа
  const login = (name, email) => {
    setUser({ name, email });
  };

  // Функция выхода
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};