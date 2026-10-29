import { memo } from 'react';

const GalleryCard = memo(function GalleryCard({ id, img, title, isFavorite, onToggleFavorite, onClick }) {
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
    </article>
  );
}); 

export default GalleryCard;