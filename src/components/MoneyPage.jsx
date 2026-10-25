import { useState } from 'react';
import GalleryCard from './GalleryCard';
import { allItems } from '../data'; // Импортируем данные

function MoneyPage({ favorites, onToggleFavorite }) {
  
// Фильтруем только монеты
  const moneyData = allItems.filter(item => item.category === 'money');
  const [selectedMoney, setSelectedMoney] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (money) => {
    setSelectedMoney(money);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMoney(null);
  };

  return (
    <div>
      <header>
        <h2>Монеты и банкноты</h2>
      </header>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {moneyData.map((money) => (
          <GalleryCard 
            key={money.id} 
            id={money.id} // <--- добавили id
            img={money.img} 
            title={money.title} 
            isFavorite={favorites.includes(money.id)} // <--- проверяем
            onToggleFavorite={onToggleFavorite} // <--- передаем функцию
            onClick={() => handleCardClick(money)}
          />
        ))}
      </div>

      {/* Модалка для монет */}
      {isModalOpen && selectedMoney && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedMoney.title}</h2>
            <p>Здесь будет подробное описание.</p>
            <button onClick={handleCloseModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoneyPage;