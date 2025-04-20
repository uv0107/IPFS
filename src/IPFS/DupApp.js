// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrustGridForm from './TrustGridForm';
import ThankYou from './ThankYou';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrustGridForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
