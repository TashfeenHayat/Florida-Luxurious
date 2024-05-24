import React from "react";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Admin/Dashboard";
import Agent from "./pages/Admin/Agents";
import AddAgent from "./pages/Admin/AddAgent";
import Filter from "./pages/Admin/Filters";
import AddFilter from "./pages/Admin/AddFilter";
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
import BoatOwners from "./pages/BoatOwners";
function App() {
  const location = useLocation();
  let isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <TopToScroll>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/features/:id" element={<DetailProperty />} />
          <Route path="/meet-the-team" element={<Agents />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/agent/:id" element={<AgentProfile />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/sold-properties" element={<SoldProperties />} />
          <Route path="/boat-owner" element={<BoatOwners />} />
          <Route path="/404" element={<NotFound />} />
          <Route element={<Dashboard />}>
            <Route path="/admin/dashboard" element={<p>Dashboard</p>} />
            <Route path="/admin/filter" element={<Filter />} />
            <Route path="/admin/filter/add" element={<AddFilter />} />
            <Route path="/admin/filter/edit/:id" element={<AddFilter />} />
            <Route path="/admin/agent" element={<Agent />} />
            <Route path="/admin/agent/add" element={<AddAgent />} />
            <Route path="/admin/agent/edit/:id" element={<AddAgent />} />
            <Route path="/admin/property" element={<Property />} />
          </Route>
        </Routes>
      </TopToScroll>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
