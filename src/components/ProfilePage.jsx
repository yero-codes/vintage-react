import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../hooks/useCart';
import OrderHistory from './OrderHistory'; // Импортируем историю заказов
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  // Состояние для переключения вкладок
  const [activeTab, setActiveTab] = useState('orders'); 

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>Личный кабинет</h2>
        <div className="user-info">
          <span>{user.email}</span>
          <button onClick={handleLogout} className="logout-btn">Выйти</button>
        </div>
      </div>

      {/* Вкладки */}
      <div className="profile-tabs">
        <button 
          className={activeTab === 'orders' ? 'tab active' : 'tab'} 
          onClick={() => setActiveTab('orders')}
        >
          Мои заказы
        </button>
        <button 
          className={activeTab === 'favorites' ? 'tab active' : 'tab'} 
          onClick={() => setActiveTab('favorites')}
        >
          Избранное ({favorites.length})
        </button>
        <button 
          className={activeTab === 'cart' ? 'tab active' : 'tab'} 
          onClick={() => setActiveTab('cart')}
        >
          Корзина ({cartItems.length})
        </button>
      </div>

      {/* Содержимое вкладок */}
      <div className="profile-content">
        {activeTab === 'orders' && <OrderHistory />}
        
        {activeTab === 'favorites' && (
          <div>
            <h3>Избранное</h3>
            {favorites.length === 0 ? <p>Пусто</p> : <p>Здесь будут ваши избранные товары (нужно передать данные)</p>}
          </div>
        )}

        {activeTab === 'cart' && (
          <div>
            <h3>Корзина</h3>
            {cartItems.length === 0 ? <p>Пусто</p> : <p>Здесь будут ваши товары из корзины (нужно передать данные)</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;