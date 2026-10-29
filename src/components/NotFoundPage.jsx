import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh',
      textAlign: 'center',
      padding: '20px'
    }}>

      
      <h1 className="error-number"  style={{ 
        fontSize: '120px', 
        fontWeight: 'bold', 
        color: '#b8651b', 
        margin: 0,
        lineHeight: 1,
        textShadow: '4px 4px 0 rgba(0,0,0,0.1)'
      }}>
        404
      </h1>
      
      <h2 style={{ 
        fontSize: '28px', 
        color: '#3b2a1a', 
        marginTop: '20px',
        marginBottom: '10px'
      }}>
        Упс! Страница не найдена
      </h2>
      
      <p style={{ 
        fontSize: '18px', 
        color: '#666', 
        maxWidth: '500px',
        marginBottom: '30px'
      }}>
        Возможно, вы перешли по устаревшей ссылке или ошиблись в адресе. 
        Но не расстраивайтесь — у нас есть много других интересных страниц!
      </p>
      
      <Link 
        to="/" 
        style={{ 
          padding: '12px 30px', 
          backgroundColor: '#b8651b', 
          color: '#fff', 
          textDecoration: 'none', 
          borderRadius: '6px', 
          fontSize: '18px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#b8651b'}
      >
        ← Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundPage;