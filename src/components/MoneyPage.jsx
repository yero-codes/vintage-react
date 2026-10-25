import { useState } from 'react';
import GalleryCard from './GalleryCard';

function MoneyPage({ favorites, onToggleFavorite }) {
  // Данные для монет (можно добавить новые)
  const moneyData = [
    { id: 201, img: 'money1.jpg', title: 'Банкноты' },
    { id: 202, img: 'money2.jpg', title: 'Монеты разные' },
    { id: 203, img: 'money3.jpg', title: 'Монеты юбилейные' },
    { id: 204, img: 'money4.jpg', title: 'Президенты США' },
    { id: 205, img: 'money5.jpg', title: 'Коллекция монет' },
    { id: 206, img: 'money6.jpg', title: 'Коллекция монет' } ,
    { id: 207, img: 'money7.jpg', title: 'Fauna del Caribe I' },
    { id: 208, img: 'money8.jpg', title: 'Fauna del Caribe II' } 
  ];

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