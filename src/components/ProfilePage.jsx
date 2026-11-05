import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../hooks/useCart';
import OrderHistory from './OrderHistory'; // Импортируем историю заказов
import './ProfilePage.css';
import { allItems } from '../data';

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
          <div className="profile-list">
            <h3>Избранное</h3>
            {favorites.length === 0 ? (
              <p>У вас пока нет избранных товаров.</p>
            ) : (
              <div className="profile-items-grid">
                {favorites.map((favId) => {
                  // Находим полный объект товара по его ID
                  const item = allItems.find(i => i.id === favId);
                  if (!item) return null; // Если товар не найден (например, удален)

                  return (
                    <div key={item.id} className="profile-item-card">
                      <img src={`${import.meta.env.BASE_URL}images/${item.img}`} alt={item.title} />
                      <div className="item-info">
                        <h4>{item.title}</h4>
                        <p>{item.price} ₽</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="profile-list">
            <h3>Корзина</h3>
            {cartItems.length === 0 ? (
              <p>Ваша корзина пуста.</p>
            ) : (
              <div className="profile-items-grid">
                {cartItems.map((item) => (
                  <div key={item.id} className="profile-item-card">
                    <img src={`${import.meta.env.BASE_URL}images/${item.img}`} alt={item.title} />
                    <div className="item-info">
                      <h4>{item.title}</h4>
                      <p>{item.price} ₽ <span className="item-count">x{item.count}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;