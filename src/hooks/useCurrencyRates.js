import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://www.cbr-xml-daily.ru/daily_json.js';

export function useCurrencyRates() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL);
      
      if (!res.ok) throw new Error('Ошибка загрузки курсов');
      
      const data = await res.json();
      
      // Нас интересуют только USD и EUR
      setRates({
        usd: data.Valute.USD,
        eur: data.Valute.EUR,
        date: data.Date,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return { rates, loading, error, fetchRates };
}