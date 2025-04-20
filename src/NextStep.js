import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NextStep = () => {
  const location = useLocation();
  const receivedCID = location.state?.cid || '';

  const [formData, setFormData] = useState({
    landID: '',
    registrationID: '',
    surveyNumber: '',
    geoCoordinates: '',
    landArea: '',
    owner: '',
    email: '',
    phone: '',
    governmentID: '',
    residentialAddress: '',
    ipfsCID: receivedCID
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting to blockchain:", formData);
    alert('Form ready to send to blockchain!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📝 Land Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '1rem' }}>
            <label>{key}</label><br />
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              disabled={key === 'ipfsCID'}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
        ))}
        <button type="submit">Submit to Blockchain</button>
      </form>
    </div>
  );
};

export default NextStep;
