import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage1 from './Componenets/Homepage1';
import Register from './Register';
import Login from './Componenets/Login';
import Homepage2 from './Componenets/Homepage2';
import FeatureSection from './Componenets/FeatureSection';
import Bottom from './Componenets/Bottom';
import Gallary from './Componenets/Gallary';
// import SignOut from './SignOut'; // Ensure this import is correct if you use the SignOut component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage1 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage2 />} />
        <Route path="/feature" element={<FeatureSection />} />
        <Route path="/Bottom" element={<Bottom />} />
        <Route path="/Gallary" element={<Gallary />} />
        <Route path="/sign-out" element={<Homepage1 />} />
      </Routes>
    </Router>
  );
}

export default App;
