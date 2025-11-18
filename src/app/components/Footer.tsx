'use client';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--dark-gray)',
      color: 'var(--white)',
      padding: '3rem 0 1rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Logo and Company Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--primary-base)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: 'var(--white)'
              }}>
                AS
              </div>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--white)'
              }}>
                AutoSapiens
              </span>
            </div>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              lineHeight: 1.6
            }}>
              Автоматизация бизнес-процессов с помощью искусственного интеллекта
            </p>
          </div>

          {/* Address */}
          <div>
            <h5 style={{
              color: 'var(--white)',
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              Адрес
            </h5>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              lineHeight: 1.6
            }}>
              Улица<br />
              Город, индекс
            </p>
          </div>

          {/* Contact */}
          <div>
            <h5 style={{
              color: 'var(--white)',
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              Контакты
            </h5>
            <div style={{
              color: 'rgba(255, 255, 255, 0.92)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              fontWeight: 500,
              textShadow: '0 0 4px rgba(0, 0, 0, 0.18)'
            }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                Email: <a href="mailto:info@autosapiens.by" style={{ color: 'rgba(255, 255, 255, 0.95)', textDecoration: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.7)' }}>info@autosapiens.by</a>
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                Телефон: <a href="tel:+375447761504" style={{ color: 'rgba(255, 255, 255, 0.95)', textDecoration: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.7)' }}>+375 29 7055015</a>
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                Telegram: <a href="https://t.me/artmartinv" target="_blank" style={{ color: 'rgba(255, 255, 255, 0.95)', textDecoration: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.7)' }}>@artmartinv</a>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h5 style={{
              color: 'var(--white)',
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              Следите за нами
            </h5>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <a 
                href="https://t.me/automatibiz" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--primary-base)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--white)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-base)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/artur_aitomat" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--primary-base)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--white)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-base)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div style={{
          borderTop: '1px solid var(--border-divider)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            margin: 0
          }}>
            © Copyright 2025 AutoSapiens - All Rights Reserved
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <a 
              href="#" 
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                textDecoration: 'none'
              }}
            >
              Политика конфиденциальности
            </a>
            <a 
              href="#" 
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                textDecoration: 'none'
              }}
            >
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
