import React from 'react';
import { Button } from '../../components/ui/Button';

export const GamePage: React.FC = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url("/images/hero-bg-6bfd80.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '0 0 30px 30px',
      overflow: 'hidden'
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(13, 13, 13, 0.65)',
        borderRadius: '0 0 30px 30px'
      }} />
      
      {/* Header */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '60px 40px 24px'
      }}>
        <div style={{
          maxWidth: '1530px',
          margin: '0 auto',
          padding: '10px 40px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '60px'
        }}>
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#" style={{
              color: '#000000',
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '16px',
              textDecoration: 'none'
            }}>Главная</a>
            <a href="#" style={{
              color: '#000000',
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '16px',
              textDecoration: 'none'
            }}>Правила</a>
            <a href="#" style={{
              color: '#000000',
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '16px',
              textDecoration: 'none'
            }}>Миссия игры</a>
            <a href="#" style={{
              color: '#000000',
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '16px',
              textDecoration: 'none'
            }}>Статьи</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button style={{
              background: '#000000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '100px',
              fontFamily: 'Comfortaa, sans-serif',
              fontWeight: 600,
              fontSize: '20px',
              height: '60px',
              padding: '20px 50px',
              cursor: 'pointer'
            }}>Попробовать сейчас</button>
            <img src="/images/logo-header.svg" alt="stress help" style={{ width: '132px', height: '60px' }} />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        color: '#ffffff',
        padding: '0 40px'
      }}>
        <div>
          <h1 style={{
            fontFamily: 'Comfortaa, sans-serif',
            fontWeight: 400,
            fontSize: '64px',
            lineHeight: '0.84375em',
            letterSpacing: '-0.03125em',
            margin: '0 0 24px 0'
          }}>
            Самогочи: антистресс<br/>
            игра прямо в браузере
          </h1>
          <p style={{
            fontFamily: 'Comfortaa, sans-serif',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '1.1em',
            letterSpacing: '-0.025em',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: '0 0 48px 0'
          }}>
            Создай персонажа, заботься о нём и вместе находите способы<br/>
            справляться с тревогой мягко и с улыбкой
          </p>
          <button style={{
            background: '#22D4EA',
            color: '#ffffff',
            border: 'none',
            borderRadius: '35px',
            fontFamily: 'Comfortaa, sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            height: '60px',
            padding: '20px 50px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.border = '1px dashed #22D4EA';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#22D4EA';
            e.currentTarget.style.border = 'none';
          }}>
            Начать игру
          </button>
        </div>
      </div>
    </div>
  );
};


