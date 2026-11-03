import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './ProfilePage.css';

const ProfilePage = () => {
const { user, logout } = useAuth();
const handleLogout = () => {
    logout();
    navigate('/'); // Перенаправляем на главную после выхода
  };

  const navigate = useNavigate();

    // Если пользователь не вошел, перенаправляем на страницу входа
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Пока идет перенаправление, ничего не рендерим
  if (!user) {
    return null; 
  }

  return (
    <div className="profile-page">
      <h2>Личный кабинет</h2>
      <div className="profile-info">
        <p><strong>Имя:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="profile-actions">
        <button onClick={handleLogout} className="logout-btn">Выйти из аккаунта</button>
      </div>
    </div>
  );
};

export default ProfilePage;