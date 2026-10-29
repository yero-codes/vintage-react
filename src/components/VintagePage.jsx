import { useState } from 'react';
import GalleryCard from './GalleryCard';
import { allItems } from '../data'; // Импортируем данные
import { useFavorites } from '../context/FavoritesContext';

function VintagePage() {
   const { favorites, toggleFavorite } = useFavorites();
 
  // Фильтруем только винтажные вещи
  const vintageData = allItems.filter(item => item.category === 'vintagethings');

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
            onToggleFavorite={toggleFavorite} // <--- передаем функцию
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