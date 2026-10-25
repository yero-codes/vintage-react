import { useState } from 'react';
import GalleryCard from './GalleryCard';

function BooksPage({ favorites, onToggleFavorite }) {
  // Данные для книг (можете добавить свои)
  const booksData = [
    { id: 1, img: 'book1.jpg', title: 'Повести и рассказы' },
    { id: 2, img: 'book2.jpg', title: 'Танкист' },
    { id: 3, img: 'book3.jpg', title: 'Стихи' },
    { id: 4, img: 'book4.jpg', title: 'И.А. Бунин. Стихотворения и переводы' },
    { id: 5, img: 'book5.jpg', title: 'Марина Цветаева. Стихи. Проза' },
    { id: 6, img: 'book6.jpg', title: 'Г.Ф. Шумахер. Паутина жизни' }
  ];

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