import { useState } from 'react';
import GalleryCard from './GalleryCard';

function VintagePage({ favorites, onToggleFavorite }) {
  const vintageData = [
    { id: 301, img: 'grafin.jpg', title: 'Графин "Дама" с бокалами' },
    { id: 302, img: 'neznakomka.jpg', title: 'Картина "Незнакомка"' },
    { id: 303, img: 'pugovizy.jpg', title: 'Коллекция пуговиц' },
    { id: 304, img: 'eastereggs.jpg', title: 'Пасхальные яйца' },
    { id: 305, img: 'lenin.jpg', title: 'В.И.Ленин' },
    { id: 306, img: 'sigaretnica.jpg', title: 'Сигаретница СССР' },
    { id: 307, img: 'podstakannik.jpg', title: 'Подстаканник серебряный' },
    { id: 308, img: 'goodnight.jpg', title: 'Спокойной ночи (чеканка)' }
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
            id={item.id} // <--- добавили id
            img={item.img} 
            title={item.title} 
            isFavorite={favorites.includes(item.id)} // <--- проверяем
            onToggleFavorite={onToggleFavorite} // <--- передаем функцию
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