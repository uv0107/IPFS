import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WalletConnect.css";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        navigate("/DocumentUpload");
      } catch (err) {
        console.error("User rejected wallet connection", err);
      }
    } else {
      alert("MetaMask not found! Please install it to proceed.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0] || "");
      });
    }
  }, []);

  return (
    <div className="web3-container">
      <h1 className="web3-title">🌐 TrustGrid Land Registry</h1>
      <p className="web3-tagline">Decentralized • Secure • Transparent</p>

      <div className="wallet-box">
        {!walletAddress ? (
          <button onClick={connectWallet} className="web3-btn">
            🦊 Connect MetaMask
          </button>
        ) : (
          <p className="connected">
            Connected: <span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          </p>
        )}
      </div>

      <section className="section">
        <h2>📌 Why Land Ownership?</h2>
        <p>
          Land ownership establishes legal proof, helps resolve disputes, and enables economic empowerment.
          It’s the backbone of real estate and agricultural stability.
        </p>
      </section>

      <section className="section">
        <h2>🛡️ Blockchain Benefits</h2>
        <ul>
          <li>🔐 Tamper-proof and immutable land records</li>
          <li>🌍 Transparent ownership transfers</li>
          <li>⚡ Fast and trustless verification process</li>
          <li>✅ Reduced corruption and fraud</li>
        </ul>
      </section>

      <footer className="footer">
        © 2025 • <strong>UV Blockchain Registry</strong> • Built with 💙 Web3
      </footer>
    </div>
  );
};

export default WalletConnect;
