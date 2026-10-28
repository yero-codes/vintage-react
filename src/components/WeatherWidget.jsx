import { useState, useEffect } from 'react';
import { useWeather } from '../hooks/useWeather';

function WeatherWidget() {
  const { weather, loading, error, fetchWeather } = useWeather();
  const [city, setCity] = useState('Novosibirsk');

  // Загружаем погоду при первом рендере
  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: '400px' }}>
      <h3>Погода</h3>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Город"
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#b8651b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Найти
        </button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {weather && (
        <div>
          <h4>{weather.name}</h4>
          <p style={{ fontSize: '32px', margin: '10px 0' }}>{Math.round(weather.main.temp)}°C</p>
          <p style={{ textTransform: 'capitalize' }}>{weather.weather[0].description}</p>
          
          <p>Влажность: {weather.main.humidity}%</p>
          <p>Ветер: {Math.round(weather.wind.speed)} м/с</p>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;