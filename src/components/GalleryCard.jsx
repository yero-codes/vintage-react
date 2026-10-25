function GalleryCard({ id, img, title, isFavorite, onToggleFavorite, onClick }) {
  return (
    <article className="card" style={{ position: 'relative' }}>
      <figure className="card-figure" onClick={onClick} style={{ cursor: 'pointer' }}>
        <img src={`${import.meta.env.BASE_URL}images/${img}`} alt={title} loading="lazy" />
        <figcaption>{title}</figcaption>
      </figure>
      
      {/* Кнопка-сердечко */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Чтобы клик по сердечку не открывал модалку
          onToggleFavorite(id);
        }}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </article>
  );
}

export default GalleryCard;