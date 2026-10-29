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
import ArticlesPage from './components/ArticlesPage';

function App() {
  return (
    <div className="container">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/farfor" element={<FarforPage />} />
          <Route path="/money" element={<MoneyPage />} />
          <Route path="/vintagethings" element={<VintagePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/contacts" element={<ContactForm />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
        </Routes>
      </main>

      <AudioPlayer />
      <ScrollToTop />
    </div>
  );
}

export default App;