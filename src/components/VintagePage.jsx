import { useState } from 'react';
import GalleryCard from './GalleryCard';

function VintagePage() {
  const vintageData = [
    { id: 1, img: 'grafin.jpg', title: 'Графин "Дама" с бокалами' },
    { id: 2, img: 'neznakomka.jpg', title: 'Картина "Незнакомка"' },
    { id: 3, img: 'pugovizy.jpg', title: 'Коллекция пуговиц' },
    { id: 4, img: 'eastereggs.jpg', title: 'Пасхальные яйца' },
    { id: 5, img: 'lenin.jpg', title: 'В.И.Ленин' },
    { id: 6, img: 'sigaretnica.jpg', title: 'Сигаретница СССР' },
    { id: 7, img: 'podstakannik.jpg', title: 'Подстаканник серебряный' },
    { id: 8, img: 'goodnight.jpg', title: 'Спокойной ночи (чеканка)' }
  ];

  const [selectedVintage, setSelectedVintage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (item) => {
    setSelectedVintage(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVintage(null);
  };

  return (
    <div>
      <header>
        <h2>Винтажные вещи</h2>
      </header>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {vintageData.map((item) => (
          <GalleryCard 
            key={item.id} 
            img={item.img} 
            title={item.title} 
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>

      {/* Модалка */}
      {isModalOpen && selectedVintage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedVintage.title}</h2>
            <p>Здесь будет подробное описание.</p>
            <button onClick={handleCloseModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VintagePage;