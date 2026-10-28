import { useState, useCallback } from 'react';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
      
      if (!res.ok) throw new Error('Город не найден');
      
      const data = await res.json();
      
      // Преобразуем ответ в формат, который ожидает виджет
      setWeather({
        name: city,
        main: {
          temp: data.current_condition[0].temp_C,
          humidity: data.current_condition[0].humidity,
        },
        wind: {
          speed: data.current_condition[0].windspeedKmph,
        },
        weather: [{
          description: data.current_condition[0].weatherDesc[0].value,
        }],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, fetchWeather };
}