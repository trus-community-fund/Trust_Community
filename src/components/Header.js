import React from 'react';

export default function Header() {
  return (
    <header style={{
      background: 'linear-gradient(160deg, #002366 0%, #001233 100%)',
      color: 'white',
      padding: '25px 0 35px 0',
      textAlign: 'center',
      borderBottom: '4px solid #D4AF37', // Gold Border
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      marginBottom: '20px'
    }}>
      <div className="header-content">
        <h1 style={{
          fontSize: '1.8em',
          margin: '0 0 5px 0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
          fontWeight: '800',
          fontFamily: '"Times New Roman", serif',
          letterSpacing: '0.5px'
        }}>
          Trust Community Fund
        </h1>
        <h4 style={{
          color: 'rgba(255, 255, 255, 0.8)',
          margin: '0',
          fontWeight: '400',
          fontSize: '0.9em',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          ESTD: 23 June 2024
        </h4>
      </div>
    </header>
  );
}
