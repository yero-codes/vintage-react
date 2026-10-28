import WeatherWidget from './WeatherWidget';

function HomePage() {
  const bannerImages = ['beerussr.jpg', 'kartina.jpg', 'kukla.jpg', 'patefon.jpg'];

  return (
    <div>
      <header>
        <h2>Добро пожаловать в Винтажные чудеса</h2>
      </header>
      
      {/* Лента с картинками */}
      <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', marginBottom: '30px', paddingBottom: '10px' }}>
        {bannerImages.map((img, index) => (
          <img 
            key={index}
            src={`${import.meta.env.BASE_URL}images/${img}`} 
            alt="Винтаж" 
            style={{ width: '250px', height: '350px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
          />
        ))}
      </div>

      <div style={{ maxWidth: '800px', lineHeight: '1.6', fontSize: '18px' }}>
        <p>
          Мы рады приветствовать вас в нашем виртуальном магазине! 
          Здесь вы найдете уникальные предметы советской эпохи: 
          фарфор, старинные книги, монеты и винтажные вещи.
        </p>
        <p>
          Каждый предмет — это частичка истории, которая хранит тепло 
          рук мастеров и воспоминания прошлых лет. 
        </p>
        <p>
          Используйте меню слева, чтобы перейти в интересующий вас раздел.
        </p>
         <WeatherWidget />
      </div>
    </div>
  );
}

export default HomePage;