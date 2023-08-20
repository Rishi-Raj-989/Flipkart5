import React from 'react';
import flipkartHome from '../images/flipkart-homepage.png';

function HomeF() {
  const backgroundStyles = {
    backgroundImage: `url(${flipkartHome})`, // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
  };

  return (
    <div style={backgroundStyles}>
      {/* Your homepage content */}
    </div>
  );
}

export default HomeF;
