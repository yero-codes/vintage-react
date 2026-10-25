function Header({ currentPage, onNavigate, favoritesCount, theme, toggleTheme }) {
  // Создаем массив пунктов меню для удобства
  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'books', label: 'Книги СССР' },
    { id: 'farfor', label: 'Фарфор CCCP' },
    { id: 'money', label: 'Монеты' },
    { id: 'vintagethings', label: 'Винтажные вещи' },
    { id: 'favorites', label: 'Избранное' },
    { id: 'news', label: 'Новости' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <aside className="sidebar">
      <h1 className="logo">Винтажные чудеса</h1>

      {/* Кнопка переключения темы */}
      <button 
        onClick={toggleTheme} 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#f5efe6', 
          fontSize: '20px', 
          cursor: 'pointer', 
          marginBottom: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px' 
        }}
        title={theme === 'light' ? 'Включить темную тему' : 'Включить светлую тему'}
      >
        {theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
      </button>

      {/* Бейджик с избранным */}
      <div style={{ color: '#f5efe6', marginBottom: '20px', fontSize: '18px' }}>
        Избранное: {favoritesCount}
      </div>

      <nav className="menu" aria-label="Основное меню">
        {menuItems.map((item) => (
          <button
            key={item.id}
            // Если текущая страница совпадает с id, добавляем класс active
            className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }} // Сбрасываем стили кнопки, чтобы выглядело как ссылка
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Header;