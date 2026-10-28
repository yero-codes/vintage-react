import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import NewsSkeleton from './NewsSkeleton';

function NewsPage() {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNewsData(data);
      })
      .catch((error) => console.error('Ошибка:', error))
      .finally(() => setIsLoading(false));
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
    <div>
      <header>
        <h2>Новости и статьи</h2>
      </header>
      <input 
        type="text" 
        id="search"
        placeholder="Поиск по новостям..." 
        value={searchTerm} 
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setVisibleCount(4);
        }}
        style={{ padding: '10px', width: '300px', margin: '20px 0', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {isLoading ? (
          <>
            <NewsSkeleton />
            <NewsSkeleton />
            <NewsSkeleton />
          </>
        ) : filteredNews.length === 0 ? (
          <p>Ничего не найдено.</p>
        ) : (
          <>
            {filteredNews.slice(0, visibleCount).map((post) => (
              <NewsCard 
                key={post.id} 
                title={post.title} 
                body={post.body.slice(0, 60) + '...'}
                date={new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })} 
                onClick={() => handleCardClick(post)}
              />
            ))}
            {visibleCount < filteredNews.length && (
              <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                <button 
                  onClick={() => setVisibleCount(prev => prev + 4)}
                  style={{ padding: '10px 20px', backgroundColor: '#b8651b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
                >
                  Показать ещё
                </button>
              </div>
            )}
          </>
        )}
      </div>

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

export default NewsPage;