import { NavLink } from 'react-router-dom';

function Header({ favoritesCount, theme, toggleTheme }) {
  const menuItems = [
    { to: '/', label: 'Главная' },
    { to: '/books', label: 'Книги СССР' },
    { to: '/farfor', label: 'Фарфор СССР' },
    { to: '/money', label: 'Монеты' },
    { to: '/vintagethings', label: 'Винтажные вещи' },
    { to: '/favorites', label: 'Избранное' },
    { to: '/news', label: 'Новости' },
    { to: '/contacts', label: 'Контакты' },
  ];

  return (
    <aside className="sidebar">
      <h1 className="logo">Винтажные чудеса</h1>
      
      <button 
        onClick={toggleTheme} 
        style={{ background: 'none', border: 'none', color: '#f5efe6', fontSize: '20px', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        {theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
      </button>

      <div style={{ color: '#f5efe6', marginBottom: '20px', fontSize: '18px' }}>
        ❤️ Избранное: {favoritesCount}
      </div>

      <nav className="menu" aria-label="Основное меню">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Header;