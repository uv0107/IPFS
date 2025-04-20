import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DocumentUpload.css';

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

const DocumentUpload = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file!');
      return;
    }

    setFileName(file.name);
    setLoading(true);
    const ipfsUrl = await uploadFileToPinata(file);
    if (ipfsUrl) {
      setFileUrl(ipfsUrl);
    }
    setLoading(false);
  };

  const handleNext = () => {
    navigate('/Register', { state: { cid: fileUrl } });
  };

  return (
    <div className="doc-upload-wrapper">
      <h1>📄 Upload Land Document to IPFS</h1>
      <div className="form-card">
        <form>
          <label className="form-label">Select your land PDF document</label>
          <input type="file" accept=".pdf" onChange={handleFileUpload} className="file-input" />
          {fileName && <p className="file-name">🗂️ Selected File: {fileName}</p>}
        </form>

        {loading && <p className="loading-text">⏳ Uploading to IPFS...</p>}

        {fileUrl && (
          <div className="cid-box">
            <p className="success-text">✅ Document uploaded successfully!</p>
            <div className="cid-link-box">
              <a href={fileUrl} target="_blank" rel="noreferrer" className="cid-link">{fileUrl}</a>
              <button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(fileUrl);
                  alert("Link copied to clipboard!");
                }}
              >
                📋 Copy
              </button>
            </div>
            <p className="note-text">📌 Copy the link for future references.</p>
            <button className="next-btn" onClick={handleNext}>Continue ➡️</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
