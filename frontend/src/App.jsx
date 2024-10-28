import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import SideDrawer from './layout/SideDrawer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import SubmitCommission from './pages/SubmitCommission';
import HowItWorks from './pages/HowItWorks';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <Router>
      <SideDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/submit-commission" element={<SubmitCommission />} />
        <Route path="/how-it-works-info" element={<HowItWorks />} />
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App
