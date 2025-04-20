// src/pinata.js
import axios from 'axios';

const PINATA_API_KEY = '86ef87207d15d38ca641';
const PINATA_API_SECRET = '3e6eff8df81fde6e857a081fb6b77d3a2ec03316c694239bad9fee1506937227';

export const uploadFileToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

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
    console.error('Pinata upload failed:', error);
    return null;
  }
};
