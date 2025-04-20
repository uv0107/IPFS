import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importing to access the state passed from another route

const LandRegistration = () => {
  const location = useLocation(); // To fetch the CID if passed from the previous page
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
    cid: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If the CID is passed via location.state, we update the form data
    if (location.state?.cid) {
      setFormData((prev) => ({
        ...prev,
        cid: location.state.cid, // Using the CID passed through the location
      }));
    }
  }, [location.state]);

  // Handle input changes to update form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to handle the submission (to the blockchain, IPFS, etc.)
    // Add your contract interaction and data saving logic here
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 Land Registration Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
        {[  // An array of form inputs
          ['landID', 'Land ID'],
          ['registrationID', 'Registration ID'],
          ['surveyNumber', 'Survey Number'],
          ['geoCoordinates', 'Geo Coordinates'],
          ['landArea', 'Land Area'],
          ['owner', 'Owner Name'],
          ['email', 'Owner Email'],
          ['phone', 'Phone Number'],
          ['governmentID', 'Government ID (Aadhaar/PAN)'],
          ['residentialAddress', 'Residential Address'],
        ].map(([name, placeholder]) => (
          <input
            key={name}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            required
          />
        ))}

        <input
          name="cid"
          value={formData.cid}
          readOnly
          style={{ backgroundColor: '#eee', marginTop: '10px' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Registering...' : '✅ Submit to Blockchain'}
        </button>
      </form>
    </div>
  );
};

export default LandRegistration;
