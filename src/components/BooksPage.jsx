import { useState } from 'react';
import GalleryCard from './GalleryCard';
import { allItems } from '../data'; // Импортируем данные


function BooksPage({ favorites, onToggleFavorite }) {

  // Фильтруем только книги
  const booksData = allItems.filter(item => item.category === 'books');

  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div>
      <header>
        <h2>Книги СССР</h2>
      </header>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {booksData.map((book) => (
          <GalleryCard 
            key={book.id} 
            id={book.id} // <--- добавили id
            img={book.img} 
            title={book.title} 
            isFavorite={favorites.includes(book.id)} // <--- проверяем
            onToggleFavorite={onToggleFavorite} // <--- передаем функцию
            onClick={() => handleCardClick(book)}
          />
        ))}
      </div>

      {/* Модалка для книг */}
      {isModalOpen && selectedBook && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedBook.title}</h2>
            <p>Здесь будет подробное описание книги.</p>
            <button onClick={handleCloseModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BooksPage;