import GalleryCard from './GalleryCard';
import { allItems } from '../data';

function FavoritesPage({ favorites, onToggleFavorite }) {
  // Фильтруем только те товары, которые есть в избранном
  const favoriteItems = allItems.filter(item => favorites.includes(item.id));

  return (
    <div>
      <header>
        <h2>Избранное</h2>
      </header>

      {favoriteItems.length === 0 ? (
        <p>Вы еще ничего не добавили в избранное.</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {favoriteItems.map((item) => (
            <GalleryCard 
              key={item.id} 
              id={item.id}
              img={item.img} 
              title={item.title} 
              isFavorite={true} // Они все избранные
              onToggleFavorite={onToggleFavorite}
              onClick={() => {}} // Пока без модалки, или можно добавить
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;