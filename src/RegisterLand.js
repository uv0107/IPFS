import React, { useState } from 'react';
import Web3 from 'web3';
import './registerland.css';
import { useNavigate } from 'react-router-dom';



const RegisterLand = () => {
  const navigate = useNavigate();
  const [landID, setLandID] = useState('');
  const [registrationID, setRegistrationID] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [geoCoordinates, setGeoCoordinates] = useState('');
  const [landArea, setLandArea] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [governmentID, setGovernmentID] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [cid, setCid] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const contractAddress = '0xdf9CFA9DB0c385c3f0B8886E00E811F0e870a5b5'; // Replace with your deployed contract address
      const abi = 
        [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_landID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_registrationID",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_surveyNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_geoCoordinates",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_landArea",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_email",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_phone",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_governmentID",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_residentialAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_cid",
                        "type": "string"
                    }
                ],
                "name": "registerLand",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_registrationID",
                        "type": "string"
                    }
                ],
                "name": "getLandByRegistrationID",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "landID",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "registrationID",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "surveyNumber",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "geoCoordinates",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "landArea",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "owner",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "email",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "phone",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "governmentID",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "residentialAddress",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "cid",
                                "type": "string"
                            },
                            {
                                "internalType": "bool",
                                "name": "isRegistered",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct LandRegistry.LandDetails",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "lands",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "landID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "registrationID",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "surveyNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "geoCoordinates",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "landArea",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "phone",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "governmentID",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "residentialAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "cid",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
    
      ];
      const contract = new web3.eth.Contract(abi, contractAddress);

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      try {
        await contract.methods
          .registerLand(
            landID,
            registrationID,
            surveyNumber,
            geoCoordinates,
            landArea,
            owner,
            email,
            phone,
            governmentID,
            residentialAddress,
            cid
          )
          .send({ from: account });
        alert('Land Registered Successfully!');
        navigate('/SuccessPage');
    
        
      } catch (error) {
        alert('Error registering land: ' + error.message);

      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Register Land</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Land ID"
          value={landID}
          onChange={(e) => setLandID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Registration ID"
          value={registrationID}
          onChange={(e) => setRegistrationID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Survey Number"
          value={surveyNumber}
          onChange={(e) => setSurveyNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Geo Coordinates"
          value={geoCoordinates}
          onChange={(e) => setGeoCoordinates(e.target.value)}
        />
        <input
          type="text"
          placeholder="Land Area"
          value={landArea}
          onChange={(e) => setLandArea(e.target.value)}
        />
        <input
          type="text"
          placeholder="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Government ID"
          value={governmentID}
          onChange={(e) => setGovernmentID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Residential Address"
          value={residentialAddress}
          onChange={(e) => setResidentialAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="CID (IPFS)"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
        />
        <button type="submit">Register Land</button>
      </form>
    </div>
  );
};

export default RegisterLand;
