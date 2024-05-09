import React, { useState, useEffect } from 'react';
import './style.scss';

const NoPage = () => {
  const [overlayStyle, setOverlayStyle] = useState({ opacity: 1, visibility: 'visible' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayStyle({ opacity: 0, visibility: 'hidden' });
    }, 3000); // Begins to fade out after 3000 milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="error-page">
      <h1>404 Not Found</h1>
      <div className="error-overlay" style={overlayStyle}>
        <div className="alert-message">
          <h1>Sorry, the page you're looking for is not found.</h1>
        </div>
      </div>
    </div>
  );
}

export default NoPage;
