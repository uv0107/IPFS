import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import DocumentUpload from './DocumentUpload';
import Register from './RegisterLand';
import SuccessPage from './SuccessPage';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<WalletConnect />} />
        <Route path="/DocumentUpload" element={<DocumentUpload />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/SuccessPage" element={<SuccessPage />} />
      </Routes>
    </div>
  );
};

export default App;
// import react from "react";
// function App(){
//   return(
//     <div>
//       <Register />
//     </div>
//   );
// }
// export default App;
