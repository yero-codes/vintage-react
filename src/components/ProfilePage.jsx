import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Защита страницы (если не вошли - на страницу входа)
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Функция выхода из аккаунта
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  // Если пользователя нет, не рендерим ничего (ждем редиректа)
  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <h2>Личный кабинет</h2>
      
      <div className="profile-info">
        {/* Теперь мы выводим email, так как Supabase по умолчанию дает только его */}
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="profile-actions">
        <button onClick={handleLogout} className="logout-btn">
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;