import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Переключатель режимов
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Заполните email и пароль');
      return;
    }

    try {
      if (isRegister) {
        await signUp(email, password);
        alert('Регистрация успешна! Проверьте почту (если требуется подтверждение) или войдите.');
        setIsRegister(false); // Переключаем на вход
      } else {
        await signIn(email, password);
        navigate('/profile');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>{isRegister ? 'Регистрация' : 'Вход в личный кабинет'}</h2>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="ivan@example.com"
          />
        </div>
        
        {/* Поле для пароля */}
        <div className="form-group">
          <label>Пароль</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="login-btn">
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>

      <p className="login-note" style={{ marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
      </p>
    </div>
  );
};

export default LoginPage;