import React, { useState } from 'react';
import { uploadFileToPinata } from './pinata';

const UploadResume = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const ipfsUrl = await uploadFileToPinata(file);
    if (ipfsUrl) setFileUrl(ipfsUrl);
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>📄 Decentralized Resume Uploader (Pinata)</h2>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
      {loading && <p>Uploading to IPFS via Pinata...</p>}
      {fileUrl && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>IPFS Link:</strong></p>
          <a href={fileUrl} target="_blank" rel="noreferrer">{fileUrl}</a>
          <br /><br />
          <button onClick={() => navigator.clipboard.writeText(fileUrl)}>Copy Link</button>
        </div>
      )}
    </div>
  );
};

export default UploadResume;
