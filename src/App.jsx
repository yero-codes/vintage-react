import { useState, useEffect } from 'react';
import NewsCard from './components/NewsCard';

function App() {
  const [newsData, setNewsData] = useState([]);
  // 1. Добавляем состояние для поискового запроса
  const [searchTerm, setSearchTerm] = useState('');

  //  Состояние для выбранной новости и открытия модалки
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

  // 2. Фильтруем данные НА ЛЕТУ (без изменения исходного массива)
  const filteredNews = newsData.filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.body.toLowerCase().includes(term)
    );
  });

  //  Функция для открытия модалки
  const handleCardClick = (newsItem) => {
    setSelectedNews(newsItem); // Запоминаем, какую новость выбрали
    setIsModalOpen(true);      // Открываем модалку
  };

  //  Функция для закрытия модалки
  const handleCloseModal = () => {
    setIsModalOpen(false);     // Закрываем
    setSelectedNews(null);     // Очищаем выбранную новость
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Винтажные чудеса</h1>
      
      {/* 3. Добавляем поле ввода */}
      <input 
        type="text" 
        placeholder="Поиск по новостям..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '300px', margin: '20px 0', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* 4. Используем отфильтрованный массив filteredNews */}
        {filteredNews.length === 0 ? (
          <p>Ничего не найдено.</p>
        ) : (
          filteredNews.map((post) => (
            <NewsCard 
              key={post.id} 
              title={post.title} 
              body={post.body.slice(0, 60) + '...'}
              date={new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })} 
               //  Передаем функцию клика в карточку
              onClick={() => handleCardClick(post)}
            />
          ))
        )}
      </div>
      {/*  Модальное окно (рендерится только если isModalOpen === true) */}
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