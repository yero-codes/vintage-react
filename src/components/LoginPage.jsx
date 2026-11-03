import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LoginPage.css';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Заполните все поля');
      return;
    }
    login(name, email); // Сохраняем пользователя
    navigate('/profile'); // Переходим в личный кабинет
  };

  return (
    <div className="login-page">
      <h2>Вход в личный кабинет</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ваше имя</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Иван Иванов"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="ivan@example.com"
          />
        </div>
        <button type="submit" className="login-btn">Войти</button>
      </form>
      <p className="login-note">
        * Это имитация входа. Настоящая авторизация требует бэкенда.
      </p>
    </div>
  );
};

export default LoginPage;