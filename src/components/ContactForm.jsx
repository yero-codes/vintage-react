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
    <div style={{ maxWidth: '500px' }}>
      <h2>Напишите нам</h2>
      
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
  );
}

export default ContactForm;