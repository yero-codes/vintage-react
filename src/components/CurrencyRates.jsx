import { useCurrencyRates } from '../hooks/useCurrencyRates';

function CurrencyRates() {
  const { rates, loading, error } = useCurrencyRates();

  if (loading) {
    return <p>Загрузка курсов валют...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Не удалось загрузить курсы: {error}</p>;
  }

  if (!rates) {
    return null;
  }

  // Форматируем дату
  const date = new Date(rates.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="currency-widget" style={{ 
      padding: '20px', 
      backgroundColor: '#fff', 
      borderRadius: '8px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
      maxWidth: '400px',
      marginBottom: '20px'
    }}>
      <h3>Курс валют ЦБ РФ</h3>
      <p style={{ fontSize: '12px', color: '#999' }}>на {date}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
          <span>🇺🇸 Доллар США</span>
          <strong>{rates.usd.Value.toFixed(2)} ₽</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
          <span>🇪🇺 Евро</span>
          <strong>{rates.eur.Value.toFixed(2)} ₽</strong>
        </div>
      </div>
    </div>
  );
}

export default CurrencyRates;