import { useState } from 'react';
import GalleryCard from './GalleryCard';

function FarforPage() {
  // Данные для фарфора (можно добавить новые)
  const farforData = [
    { id: 1, img: 'teapair.jpg', title: 'Чайная пара' },
    { id: 2, img: 'uzbeshka.jpg', title: 'Узбечка с чайником' },
    { id: 3, img: 'dog.jpg', title: 'Сеттер' },
    { id: 4, img: 'hozyajka.jpg', title: 'Хозяйка медной горы' },
    { id: 5, img: 'yakut.jpg', title: 'Якут с собакой' },
    { id: 6, img: 'beer.jpg', title: 'Олимпиада 1980' } ,
    { id: 7, img: 'cameo.jpg', title: 'Чайная пара "Cameo"' },
    { id: 8, img: 'lady.jpg', title: 'Леди в шляпке' } ,
    { id: 9, img: 'snowman.jpg', title: 'Снеговик' }
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
            img={farfor.img} 
            title={farfor.title} 
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