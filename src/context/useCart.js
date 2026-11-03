import { useContext } from 'react';
import { CartContext } from './CartContext'; // Импортируем сам контекст

export const useCart = () => useContext(CartContext);