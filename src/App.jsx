import { useState, useEffect } from 'react';
import NewsCard from './components/NewsCard';

function App() {
  const [newsData, setNewsData] = useState([]);
  // 1. Добавляем состояние для поискового запроса
  const [searchTerm, setSearchTerm] = useState('');

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
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;