function GalleryCard({ img, title, onClick }) {
  return (
    <article className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <figure className="card-figure">
        <img src={`/images/${img}`} alt={title} loading="lazy" />
        <figcaption>{title}</figcaption>
      </figure>
    </article>
  );
}

export default GalleryCard;