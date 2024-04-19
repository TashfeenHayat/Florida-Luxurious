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
import DetailProperty from "./pages/DetailProperty";
import Agents from "./pages/Agents";
import TopToScroll from "./ScrollToTop";
import ContactUs from "./pages/ContactUs";
import OurStory from "./pages/About";
import AgentProfile from "./pages/AgentProfile";
function App() {
  const location = useLocation();
  let isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    isAdminRoute = location.pathname.startsWith("/admin");
    let accessToken = localStorage.token;
    if (accessToken) {
      console.log(accessToken);
      axios.interceptors.request.use(
        (config) => {
          // Modify the request configuration or add headers
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        },
        (error) => {
          // Handle request errors
          return Promise.reject(error);
        }
      );
    }
  }, []);

  return (
    <>
      {!isAdminRoute && <Header />}
      <TopToScroll>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/features" element={<DetailProperty />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/about-us" element={<OurStory />} />
          <Route path="/agent/:id" element={<AgentProfile />} />
        </Routes>
        {isAdminRoute && (
          <Dashboard>
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/filter" element={<Agent />} />
              <Route path="/admin/agent" element={<Agent />} />
              <Route path="/admin/agent/add" element={<AddAgent />} />
              <Route path="/admin/agent/edit/:id" element={<AddAgent />} />
              <Route path="/admin/property" element={<Property />} />
            </Routes>
          </Dashboard>
        )}
      </TopToScroll>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
