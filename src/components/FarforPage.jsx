import { useState } from 'react';
import GalleryCard from './GalleryCard';
import { allItems } from '../data'; // Импортируем данные
import { useFavorites } from '../context/FavoritesContext'; //

function FarforPage() {
  const { favorites, toggleFavorite } = useFavorites();
  // Фильтруем только фарфор
  const farforData = allItems.filter(item => item.category === 'farfor');


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
            onToggleFavorite={toggleFavorite} // <--- передаем функцию
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