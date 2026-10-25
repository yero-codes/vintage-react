import { useState } from 'react';
import GalleryCard from './GalleryCard';

function FarforPage({ favorites, onToggleFavorite }) {
  // Данные для фарфора (можно добавить новые)
  const farforData = [
    { id: 101, img: 'teapair.jpg', title: 'Чайная пара' },
    { id: 102, img: 'uzbeshka.jpg', title: 'Узбечка с чайником' },
    { id: 103, img: 'dog.jpg', title: 'Сеттер' },
    { id: 104, img: 'hozyajka.jpg', title: 'Хозяйка медной горы' },
    { id: 105, img: 'yakut.jpg', title: 'Якут с собакой' },
    { id: 106, img: 'beer.jpg', title: 'Олимпиада 1980' } ,
    { id: 107, img: 'cameo.jpg', title: 'Чайная пара "Cameo"' },
    { id: 108, img: 'lady.jpg', title: 'Леди в шляпке' } ,
    { id: 109, img: 'snowman.jpg', title: 'Снеговик' }
  ]


  const [selectedFarfor, setSelectedFarfor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (farfor) => {
    setSelectedFarfor(farfor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFarfor(null);
  };

  return (
    <div>
      <header>
        <h2>Фарфор СССР</h2>
      </header>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {farforData.map((farfor) => (
          <GalleryCard 
            key={farfor.id} 
            id={farfor.id} // <--- добавили id
            img={farfor.img} 
            title={farfor.title} 
            isFavorite={favorites.includes(farfor.id)} // <--- проверяем
            onToggleFavorite={onToggleFavorite} // <--- передаем функцию
            onClick={() => handleCardClick(farfor)}
          />
        ))}
      </div>

      {/* Модалка для фарфора */}
      {isModalOpen && selectedFarfor && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedFarfor.title}</h2>
            <p>Здесь будет подробное описание.</p>
            <button onClick={handleCloseModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarforPage;