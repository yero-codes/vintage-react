import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import BooksPage from './components/BooksPage';
import FarforPage from './components/FarforPage';
import MoneyPage from './components/MoneyPage';
import VintagePage from './components/VintagePage';
import HomePage from './components/HomePage';
import AudioPlayer from './components/AudioPlayer';
import ScrollToTop from './components/ScrollToTop';
import FavoritesPage from './components/FavoritesPage';
import NewsPage from './components/NewsPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      let newFavorites;
      if (prev.includes(id)) {
        newFavorites = prev.filter((favId) => favId !== id);
      } else {
        newFavorites = [...prev, id];
      }
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="container">
      <Header 
        favoritesCount={favorites.length} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/books" element={<BooksPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/farfor" element={<FarforPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/money" element={<MoneyPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/vintagethings" element={<VintagePage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/contacts" element={<ContactForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <AudioPlayer />
      <ScrollToTop />
    </div>
  );
}

export default App;