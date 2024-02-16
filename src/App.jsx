// App.jsx or index.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeafletMap from './LeafletMap';
import CropAnalysis from './CropAnalysis';
import Header from './Header';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<LeafletMap />} />
        <Route path="/crop-analysis/:stateName" element={<CropAnalysis />} />
      </Routes>
    </Router>
  );
};

export default App;
