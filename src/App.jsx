import React from "react";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Admin/Dashboard";
import Agents from "./pages/Admin/Agents";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Icons from "./components/Icons";
import DetailProperty from "./pages/DetailProperty";
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <Icons />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={" "} />
        <Route path="/features" element={<DetailProperty />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/agent" element={<Agents />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
