function NewsCard({ title, body, date }) {
  return (
    <article className="card">
      <div className="news-placeholder">Новость</div>
      <div className="date">{date}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export default NewsCard;