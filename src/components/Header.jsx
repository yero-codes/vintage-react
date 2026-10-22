function Header({ currentPage, onNavigate }) {
  // Создаем массив пунктов меню для удобства
  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'books', label: 'Книги СССР' },
    { id: 'farfor', label: 'Фарфор' },
    { id: 'money', label: 'Монеты' },
    { id: 'vintagethings', label: 'Винтажные вещи' },
    { id: 'news', label: 'Новости' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <aside className="sidebar">
      <h1 className="logo">Винтажные чудеса</h1>
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