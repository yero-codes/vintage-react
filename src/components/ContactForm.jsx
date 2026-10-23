import { useState } from 'react';

function ContactForm() {
  // Создаем состояния для каждого поля
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // Для сообщений об отправке

  const handleSubmit = async (e) => {
    e.preventDefault(); // Отменяем перезагрузку страницы (как в обычном JS)

    // Простая валидация
    if (!name || !email.includes('@') || message.length < 5) {
      setStatus('Пожалуйста, заполните все поля корректно.');
      return;
    }

    setStatus('Отправка...');

    try {
      // В React мы не используем FormData, а собираем объект вручную
      const response = await fetch('https://formspree.io/f/mgaokqoe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('Форма успешно отправлена!');
        setName('');    // Очищаем поля
        setEmail('');
        setMessage('');
      } else {
        setStatus('Ошибка при отправке. Попробуйте позже.');
      }
    } catch (error) {
      setStatus('Ошибка сети. Проверьте интернет.');
    }
  };

  return (
    <div>
      <header>
        <h2>Контакты</h2>
      </header>

      {/* Сетка из двух колонок */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '40px' }}>
        
        {/* ЛЕВАЯ КОЛОНКА: Картинки */}
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <img 
            src={`${import.meta.env.BASE_URL}images/shop.jpg`} 
            alt="Лавка винтажных вещей" 
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
          />
        </div>

        {/* ПРАВАЯ КОЛОНКА: Форма */}
        <div style={{ flex: '1', minWidth: '300px' }}>
        <h3 style={{ color: '#b8651b', marginBottom: '20px' }}>Напишите нам</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label>
              Имя:
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
              />
            </label>

            <label>
              Email:
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
              />
            </label>

            <label>
              Сообщение:
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                style={{ width: '100%', padding: '10px', marginTop: '5px', minHeight: '100px' }}
              />
            </label>

            <button type="submit" style={{ padding: '10px', backgroundColor: '#b8651b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Отправить
            </button>
          </form>

          {/* Выводим статус отправки, если он есть */}
          {status && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{status}</p>}
        </div>
      </div>

      {/* Блок с адресом и картой (внизу на всю ширину) */}
      <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px' }}>
        <h3 style={{ color: '#b8651b' }}>Наш адрес</h3>
        <p><strong>Адрес:</strong> г. Новосибирск, ул. Малахитовая, 15</p>
        <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
        <p><strong>Email:</strong> info@vintage-wonders.ru</p>
        <p><strong>Режим работы:</strong> ежедневно с 10:00 до 20:00</p>

        <div style={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe 
             src="https://yandex.ru/map-widget/v1/?ll=82.920430%2C55.030199&z=16&pt=82.920430,55.030199,pm2rdm" 
            width="100%" 
            height="400" 
            frameBorder="0"
            title="Карта"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;