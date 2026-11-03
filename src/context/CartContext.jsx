import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Пытаемся взять корзину из localStorage, если ее нет - создаем пустой массив
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('vintage-cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('vintage-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Добавить товар в корзину
  const addToCart = (product) => {
    setCartItems((prev) => {
      // Проверяем, есть ли уже такой товар
      const existingItem = prev.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Если есть, увеличиваем количество (count)
        return prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      // Если нет, добавляем новый товар с count: 1
      return [...prev, { ...product, count: 1 }];
    });
  };

  // Удалить товар из корзины
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

    // Очистить всю корзину
  const clearCart = () => {
    setCartItems([]);
  };

  // Посчитать общую сумму
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.count), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};