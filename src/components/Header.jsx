function Header() {
  return (
    <aside className="sidebar">
      <h1 className="logo">Винтажные чудеса</h1>
      <nav className="menu" aria-label="Основное меню">
        {/* Пока это просто ссылки. Позже мы заменим их на React Router */}
        <a href="#" className="menu-item">Главная</a>
        <a href="#" className="menu-item">Книги СССР</a>
        <a href="#" className="menu-item">Фарфор</a>
        <a href="#" className="menu-item">Монеты</a>
        <a href="#" className="menu-item">Винтажные вещи</a>
        <a href="#" className="menu-item">Новости</a>
        <a href="#" className="menu-item">Контакты</a>
      </nav>
    </aside>
  );
}

export default Header;