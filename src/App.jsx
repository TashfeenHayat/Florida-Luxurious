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
import Properties from "./pages/Properties";
import SoldProperties from "./pages/SoldProperties";
import NotFound from "./pages/NotFound/Error404";
function App() {
  const location = useLocation();
  let isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <TopToScroll>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/features" element={<DetailProperty />} />
          <Route path="/meet-the-team" element={<Agents />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/agent/:id" element={<AgentProfile />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/sold-properties" element={<SoldProperties />} />
          <Route path="/404" element={<NotFound />} />

          <Route path="*" element={<NotFound />} />
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
