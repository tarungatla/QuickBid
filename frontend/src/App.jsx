import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import SideDrawer from './layout/SideDrawer';
import HowItWorks from './pages/HowItWorks';

const App = () => {
  return (
    <Router>
      <SideDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/how-it-works-info" element={<HowItWorks />} />
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App
