import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import './CheckoutPage.css';
import { supabase } from '../supabaseClient';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart(); // <--- Нам понадобится clearCart

  // Состояния для полей формы
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Состояние для показа сообщения об успехе
  const [isSuccess, setIsSuccess] = useState(false);

  // Если корзина пуста и заказ не оформлен, не показываем форму
  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="checkout-page empty">
        <h2>Корзина пуста</h2>
        <p>Добавьте товары, чтобы оформить заказ.</p>
        <Link to="/" className="back-link">Вернуться к покупкам</Link>
      </div>
    );
  }

    const handleSubmit = async (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы

    // Проверка на заполнение
    if (!name || !phone || !address) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      // Получаем текущего пользователя
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('Вы должны войти в аккаунт, чтобы оформить заказ!');
        navigate('/login');
        return;
      }

      // Формируем данные для отправки
      const orderData = {
        user_id: user.id,          // Привязываем заказ к ID пользователя
        items: cartItems,          // Сохраняем весь массив товаров
        total: getTotalPrice()     // Сохраняем общую сумму
      };

      // Отправляем запрос в Supabase
      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;

      // Если всё хорошо — очищаем корзину и показываем успех
      clearCart();
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      alert('Не удалось оформить заказ: ' + error.message);
    }
  
    // Очищаем корзину и показываем успех
    clearCart(); 
    setIsSuccess(true);
  };

  // Если заказ успешно оформлен
  if (isSuccess) {
    return (
      <div className="checkout-page success">
        <h2>Спасибо за заказ, {name}!</h2>
        <p>Мы свяжемся с вами по номеру {phone} для подтверждения.</p>
        <Link to="/" className="back-link">Вернуться на главную</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Оформление заказа</h2>
      
      <div className="checkout-container">
        {/* Левая часть - форма */}
        <form className="checkout-form" onSubmit={handleSubmit}>
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
            <label>Телефон</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div className="form-group">
            <label>Адрес доставки</label>
            <textarea 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              placeholder="Город, улица, дом, квартира"
              rows="3"
            />
          </div>

          <button type="submit" className="submit-btn">
            Подтвердить заказ на {getTotalPrice()} ₽
          </button>
        </form>

        {/* Правая часть - краткая сводка */}
        <div className="checkout-summary">
          <h3>Ваш заказ</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.title} <span>x{item.count}</span>
              </li>
            ))}
          </ul>
          <div className="total-row">
            <strong>Итого:</strong>
            <strong>{getTotalPrice()} ₽</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;