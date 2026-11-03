import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart'; // импортируем из нового файла useCart!
import './CartPage.css'; 

const CartPage = () => {
  // Достаем данные и функции из нашего контекста
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  // Если корзина пуста
  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Ваша корзина пуста</h2>
        <p>Самое время добавить что-нибудь винтажное!</p>
        <Link to="/" className="back-to-shop">Перейти к покупкам</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Ваша корзина</h2>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img 
              src={`${import.meta.env.BASE_URL}images/${item.img}`} 
              alt={item.title} 
              className="cart-item-img"
            />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p className="cart-item-price">{item.price} ₽</p>
              <p className="cart-item-count">Количество: {item.count}</p>
            </div>
            <div className="cart-item-actions">
              <p className="cart-item-total">{item.price * item.count} ₽</p>
              <button 
                className="remove-btn" 
                onClick={() => removeFromCart(item.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Итого: {getTotalPrice()} ₽</h3>
        <Link to="/checkout" className="checkout-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
  Оформить заказ
</Link>
      </div>
    </div>
  );
};

export default CartPage;