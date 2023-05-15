import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FrontPage from './components/frontpage';
import Login from './components/login';
import Signup from './components/signup';
import Navbar from './components/nav';
import Footer from './components/footer';

const App = () => {
  return (
    <div>
      <>
        <Navbar />
        <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </>
    </div>
  );
};

export default App;
