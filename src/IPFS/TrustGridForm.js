import React, { useState } from 'react';
import axios from 'axios';
import './TrustGridForm.css';
import { useNavigate } from 'react-router-dom';
import trustLogo from './TrustGrid.jpeg'; 

const uploadFileToPinata = async (file) => {
  const PINATA_API_KEY = '86ef87207d15d38ca641';
  const PINATA_API_SECRET = '3e6eff8df81fde6e857a081fb6b77d3a2ec03316c694239bad9fee1506937227';
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(url, formData, {
      maxContentLength: 'Infinity',
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    });

    const cid = response.data.IpfsHash;
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    return null;
  }
};

const TrustGridForm = () => {
    const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    github: '',
    resumeDescription: ''
  });
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file!');
      return;
    }

    setLoading(true);
    const ipfsUrl = await uploadFileToPinata(file);
    if (ipfsUrl) {
      setFileUrl(ipfsUrl);
      setFileName(file.name);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted! Resume is stored on IPFS.');
    setTimeout(() => {
        navigate('/thank-you');
      }, 2000); 
      
    console.log({ ...formData, fileUrl });
  };

  return (
    <div className="page-wrapper">
      <h1 className="welcome-text">🌐 TrustGrid Welcomes You</h1>
    <div className="form-container">
      <div className="header">
        <img src={trustLogo} alt="TrustGrid Logo" className="logo-img" />
        <h2 className="form-title">TrustGrid Form</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter Your Full Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="trustgrid@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label>LinkedIn Profile</label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div className="form-group">
          <label>GitHub Profile</label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            placeholder="https://github.com/yourprofile"
          />
        </div>

        <div className="form-group">
          <label>Resume Description</label>
          <textarea
            value={formData.resumeDescription}
            onChange={(e) => setFormData({ ...formData, resumeDescription: e.target.value })}
            placeholder="Mention any highlights or summary of your resume"
          />
        </div>

        <div className="form-group">
          <label>Upload Resume (PDF Only)</label>
          <input type="file" accept=".pdf" onChange={handleFileUpload} />
        </div>

        {fileUrl && (
          <div className="resume-preview">
            <a href={fileUrl} target="_blank" rel="noreferrer">📄 View Uploaded Resume</a>
            <iframe src={fileUrl} title="Resume Preview" />
          </div>
        )}

        <div className="form-group checkbox-group">
          <input type="checkbox" required />
          <label>I consent to storing my resume on IPFS for transparency.</label>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit Application'}
        </button>
      </form>
    </div>
    </div>

  );
};

export default TrustGridForm;
