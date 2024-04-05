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
import DetailProperty from "./pages/DetailProperty";
import AllTeam from "./pages/AllTeam";
import TopToScroll from "./ScrollToTop";
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <Header />}
      <TopToScroll>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={" "} />
          <Route path="/features" element={<DetailProperty />} />
          <Route path="/team" element={<AllTeam />} />
          <Route path="/admin" element={<LoginAdmin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/agent" element={<Agents />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </TopToScroll>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
