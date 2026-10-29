import { useState } from 'react';

function ContactForm() {
  // Все состояния ВНУТРИ компонента
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  // Функция валидации — на уровне компонента
  const validateField = (fieldName, value) => {
    let error = '';

    if (fieldName === 'name' && !value.trim()) {
      error = 'Введите имя';
    }
    if (fieldName === 'email' && !value.includes('@')) {
      error = 'Введите корректный email (например, name@mail.ru)';
    }
    if (fieldName === 'message' && value.length < 5) {
      error = 'Сообщение должно быть длиннее 5 символов';
    }

    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  // Обработчик отправки
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем все поля, чтобы обновить errors
    validateField('name', name);
    validateField('email', email);
    validateField('message', message);

    // Если есть ошибки или не стоит галочка — не отправляем
    if (errors.name || errors.email || errors.message || !agreed) {
      return;
    }

    setStatus('Отправка...');

    try {
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
        setName('');
        setEmail('');
        setMessage('');
        setAgreed(false); // Сбрасываем галочку
        setErrors({}); // Очищаем ошибки
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
            
            {/* Поле "Имя" */}
            <label>
              Имя:
              <input 
                type="text" 
                value={name} 
                onChange={(e) => {
                  setName(e.target.value);
                  validateField('name', e.target.value);
                }} 
                onBlur={(e) => validateField('name', e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
              />
              {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
            </label>

            {/* Поле "Email" */}
            <label>
              Email:
              <input 
                type="email" 
                value={email} 
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateField('email', e.target.value);
                }} 
                onBlur={(e) => validateField('email', e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
              />
              {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
            </label>

            {/* Поле "Сообщение" */}
            <label>
              Сообщение:
              <textarea 
                value={message} 
                onChange={(e) => {
                  setMessage(e.target.value);
                  validateField('message', e.target.value);
                }} 
                onBlur={(e) => validateField('message', e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '5px', minHeight: '100px' }}
              />
              {errors.message && <span style={{ color: 'red', fontSize: '12px' }}>{errors.message}</span>}
            </label>

            {/* Чекбокс */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '10px' }}>
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: '#b8651b' }} 
              />
              <span style={{ fontSize: '14px', color: '#666' }}>
                Я согласен на обработку персональных данных
              </span>
            </label>

            {/* Кнопка "Отправить" */}
            <button 
              type="submit" 
              disabled={!agreed} 
              style={{ 
                padding: '10px', 
                backgroundColor: agreed ? '#b8651b' : '#ccc', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: agreed ? 'pointer' : 'not-allowed' 
              }}
            >
              Отправить
            </button>
          </form>

          {status && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{status}</p>}
        </div>
      </div>

      {/* Блок с адресом и картой */}
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