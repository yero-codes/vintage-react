import { useState, useEffect } from 'react';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import ContactForm from './components/ContactForm';
import BooksPage from './components/BooksPage';
import FarforPage from './components/FarforPage';
import MoneyPage from './components/MoneyPage';
import VintagePage from './components/VintagePage';
import HomePage from './components/HomePage';
import AudioPlayer from './components/AudioPlayer';
import ScrollToTop from './components/ScrollToTop';
import FavoritesPage from './components/FavoritesPage';
import NewsSkeleton from './components/NewsSkeleton';

function App() {
  // НОВОЕ: Состояние текущей страницы (по умолчанию 'Home')
  const [currentPage, setCurrentPage] = useState('home');
  
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

    // Состояние для избранного
  const [favorites, setFavorites] = useState(() => {
    // Читаем из localStorage при первой загрузке
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

    // Состояние для темы (по умолчанию 'light')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    setIsLoading(true); // Начинаем загрузку

    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((response) => response.json())
      .then((data) => {

        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNewsData(data);
      })

      .catch((error) => console.error('Ошибка:', error))
      .finally(() => setIsLoading(false)); 
  }, []);

    // Эффект для применения темы
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]); // <--- Здесь зависимость от theme

  

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

    // Функция добавления/удаления из избранного
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      let newFavorites;
      if (prev.includes(id)) {
        newFavorites = prev.filter((favId) => favId !== id);
      } else {
        newFavorites = [...prev, id];
      }
      // Сохраняем в localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // НОВОЕ: Функция для переключения страниц
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
  };

  // Функция переключения темной и светлой тем
    const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
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

            {isLoading ? (
              // 1. Показываем скелетоны, если идет загрузка
              <>
                <NewsSkeleton />
                <NewsSkeleton />
                <NewsSkeleton />
              </>

            ) : filteredNews.length === 0 ? (
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

    // ВСЕ СТРАНИЦЫ
    if (currentPage === 'books') return <BooksPage favorites={favorites} onToggleFavorite={toggleFavorite} />;
    if (currentPage === 'farfor') return <FarforPage favorites={favorites} onToggleFavorite={toggleFavorite} />;
    if (currentPage === 'money') return <MoneyPage favorites={favorites} onToggleFavorite={toggleFavorite} />;
    if (currentPage === 'vintagethings') return <VintagePage favorites={favorites} onToggleFavorite={toggleFavorite} />;
    if (currentPage === 'contacts') return <ContactForm />;

    // ИЗБРАННОЕ
    if (currentPage === 'favorites') return <FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} />;
    
    // ГЛАВНАЯ СТРАНИЦА
      return <HomePage />;
  };

  return (
    <div className="container">
      {/* Передаем текущую страницу и функцию переключения в шапку */}
            <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        favoritesCount={favorites.length} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

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
      <AudioPlayer />
      <ScrollToTop />
    </div>
  );
}

export default App;