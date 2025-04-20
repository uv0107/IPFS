import React from 'react';
import './successPage.css'; // Import the custom CSS

const SuccessPage = () => {
  return (
    <div className="success-container">
      <div className="success-message">
        <h1>Your Land is Securely Registered on the Blockchain</h1>
        <p>Congratulations! Your land is now safely stored and verified through blockchain technology.</p>
        <p>Stay assured that your ownership is protected and accessible anytime.</p>
        <div className="button-container">
          <button className="view-details-button">View Details</button>
          <button className="home-button">Go to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
