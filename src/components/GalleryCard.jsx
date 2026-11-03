import { memo } from 'react';
import { useCart } from '../context/CartContext';


const GalleryCard = memo(function GalleryCard({ id, img, title, price, isFavorite, onToggleFavorite, onClick }) {
const { addToCart } = useCart();
  return (
    <article className="card" style={{ position: 'relative' }}>
      <figure className="card-figure" onClick={onClick} style={{ cursor: 'pointer' }}>
        <img src={`${import.meta.env.BASE_URL}images/${img}`} alt={title} loading="lazy" />
        <figcaption>{title}</figcaption>
      </figure>
      
      {/* Кнопка-сердечко */}
      <button 
        className="favorite-btn" // <--- Добавили класс для стилей
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(id);
        }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      {/* 3. Цена и кнопка В корзину */}
      <div className="card-bottom">
        <p className="card-price">{price} ₽</p>
        <button 
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation(); // Чтобы не срабатывал клик по всей карточке
            // Передаем объект товара, чтобы в корзине были все данные
            addToCart({ id, img, title, price });
          }}
        >
          В корзину
        </button>
      </div>
    </article>
  );
}); 

export default GalleryCard;