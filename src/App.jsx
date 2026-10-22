import { useState, useEffect } from 'react';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import ContactForm from './components/ContactForm';
import BooksPage from './components/BooksPage';

function App() {
  // НОВОЕ: Состояние текущей страницы (по умолчанию 'news')
  const [currentPage, setCurrentPage] = useState('news');
  
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

  // НОВОЕ: Функция для переключения страниц
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
  };

  // НОВОЕ: Рендерим контент в зависимости от текущей страницы
  const renderContent = () => {
    if (currentPage === 'news') {
      return (
        <>
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
        </>
      );
    }

    // Заглушки для остальных страниц
    if (currentPage === 'books') return <BooksPage />;
    if (currentPage === 'farfor') return <h2>Фарфор (скоро)</h2>;
    if (currentPage === 'money') return <h2>Монеты (скоро)</h2>;
    if (currentPage === 'vintagethings') return <h2>Винтажные вещи (скоро)</h2>;
    if (currentPage === 'contacts') return <ContactForm />;
    
    // Главная страница
    return <h2>Добро пожаловать в Винтажные чудеса!</h2>;
  };

  return (
    <div className="container">
      {/* Передаем текущую страницу и функцию переключения в шапку */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="content">
        {renderContent()}
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