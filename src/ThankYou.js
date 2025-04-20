// ThankYou.js
import React from 'react';
import './ThankYou.css';

function ThankYou() {
  return (
    <div className="thankyou-wrapper">
      <h1>🎉 Thank You!</h1>
      <p>Your resume has been successfully submitted to <strong>TrustGrid</strong>.</p>
      <p>We’ll review your information and get back to you soon.</p>
      <a href="/" className="back-link">← Go back to form</a>
    </div>
  );
}

export default ThankYou;
