import { useState, useEffect } from 'react';
import Header from './components/Header'; // Импортируем шапку
import NewsCard from './components/NewsCard';

function App() {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNewsData(data);
      })
      .catch((error) => console.error('Ошибка:', error));
  }, []);

  const filteredNews = newsData.filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.body.toLowerCase().includes(term)
    );
  });

  const handleCardClick = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    // Обертка container, как в старом проекте
    <div className="container">
      {/* Вставляем шапку */}
      <Header />

      {/* Основной контент */}
      <main className="content">
        <header>
          <h2>Новости и статьи</h2>
        </header>

        <input 
          type="text" 
          placeholder="Поиск по новостям..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', margin: '20px 0', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {filteredNews.length === 0 ? (
            <p>Ничего не найдено.</p>
          ) : (
            filteredNews.map((post) => (
              <NewsCard 
                key={post.id} 
                title={post.title} 
                body={post.body.slice(0, 60) + '...'}
                date={new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })} 
                onClick={() => handleCardClick(post)}
              />
            ))
          )}
        </div>
      </main>

      {isModalOpen && selectedNews && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNews.title}</h2>
            <p>{selectedNews.body}</p>
            <button onClick={handleCloseModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;