function GalleryCard({ img, title, onClick }) {
  return (
    <article className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <figure className="card-figure">
        <img src={`${import.meta.env.BASE_URL}images/${img}`} alt={title} loading="lazy" />
        <figcaption>{title}</figcaption>
      </figure>
    </article>
  );
}

export default GalleryCard;