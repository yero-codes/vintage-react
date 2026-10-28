import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '72px', color: '#b8651b', margin: 0 }}>404</h1>
      <h2>Страница не найдена</h2>
      <p>Возможно, вы перешли по устаревшей ссылке.</p>
      <Link to="/" style={{ color: '#b8651b', fontSize: '18px' }}>← Вернуться на главную</Link>
    </div>
  );
}

export default NotFoundPage;