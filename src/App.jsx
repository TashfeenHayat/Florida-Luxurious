import React, { useEffect } from "react";
import axios from "axios";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Admin/Dashboard";
import Agent from "./pages/Admin/Agents";
import AddAgent from "./pages/Admin/AddAgent";
import Property from "./pages/Admin/Property";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Icons from "./components/Icons";
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        // Modify the request configuration or add headers
        config.headers.Authorization = `Bearer ${localStorage.token}`;
        return config;
      },
      (error) => {
        // Handle request errors
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <>
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <Icons />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/signup" element={<Signup />} />
      </Routes>
      <Dashboard>
        <Routes>
          <Route path="/admin/filter" element={<Agent />} />
          <Route path="/admin/agent" element={<Agent />} />
          <Route path="/admin/agent/add" element={<AddAgent />} />
          <Route path="/admin/property" element={<Property />} />
        </Routes>
      </Dashboard>
      <Footer />
    </>
  );
}

export default App;
