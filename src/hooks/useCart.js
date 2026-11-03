import { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Импортируем сам контекст

export const useCart = () => useContext(CartContext);