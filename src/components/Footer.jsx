import React from 'react';
import './Footer.css';

const Footer = () => {
  // Получаем текущий год автоматически
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Vintage Gallery. Все права защищены.</p>
        <div className="footer-links">
          <a href="/#">Политика конфиденциальности</a>
          <a href="/#">Контакты</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;