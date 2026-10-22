function NewsCard({ title, body, date, onClick }) {
  return (
    // Добавили onClick и style={{ cursor: 'pointer' }}
    <article className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="news-placeholder">Новость</div>
      <div className="date">{date}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export default NewsCard;