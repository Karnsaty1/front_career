import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import image from './image.webp';

const Home = () => {
  const generateLink = (path) => {
    const uniqueId = uuidv4();
    return `/${path}/${uniqueId}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f9',
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <Link style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: '#fff',
        }} to="#">CareerConnect</Link>
        <nav>
          <Link to={generateLink('signUp')} style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              backgroundColor: '#fff',
              color: '#007bff',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}>Sign Up</button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginBottom: '20px',
        }} className='image-div'>
          <img src={image} alt="CareerConnect" style={{
            width: '100%',
            maxWidth: '900px',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }} />
        </div>
        <p style={{
          fontSize: '1.2rem',
          textAlign: 'center',
          color: '#555',
          maxWidth: '800px',
          lineHeight: '1.6',
        }}>
          Welcome to CareerConnect, your platform to reconnect with your alma mater, build professional networks, and discover new opportunities. Sign up today to stay informed and take the next step in your career journey.
        </p>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#343a40',
        color: '#fff',
        textAlign: 'center',
        padding: '10px 20px',
        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
