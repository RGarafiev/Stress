import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Burger Button */}
      <button 
        className="burger-button"
        onClick={toggleMenu}
        aria-label="Открыть меню"
      >
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h3>Меню</h3>
              <button 
                className="mobile-menu-close"
                onClick={toggleMenu}
                aria-label="Закрыть меню"
              >
                ×
              </button>
            </div>
            
            <nav className="mobile-menu-nav">
              <Link to="/" className="mobile-menu-link" onClick={toggleMenu}>
                Главная
              </Link>
              <a href="#rules" className="mobile-menu-link" onClick={toggleMenu}>
                Правила
              </a>
              <a href="#mission" className="mobile-menu-link" onClick={toggleMenu}>
                Миссия игры
              </a>
              <a href="#blog" className="mobile-menu-link" onClick={toggleMenu}>
                Статьи
              </a>
            </nav>

            <div className="mobile-menu-actions">
              <Button 
                variant="game" 
                onClick={() => { navigate('/game'); toggleMenu(); }}
                style={{ width: '100%' }}
              >
                Попробовать сейчас
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
