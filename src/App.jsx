import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

// Import your components and pages
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Admin/Dashboard";
import Agent from "./pages/Admin/Agents";
import AddAgent from "./pages/Admin/AddAgent";
import Filter from "./pages/Admin/Filters";
import AddFilter from "./pages/Admin/AddFilter";
import PropertyList from "./pages/Admin/Properties";
import AddProperty from "./pages/Admin/AddProperty";
import Press from "./pages/Admin/Press";
import Report from "./pages/Admin/Report";
import Inquiries from "./pages/Admin/Inquiries";
import Blog from "./pages/Admin/Blog";
import AgentBlog from "./pages/AgentBlog";
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
import AgentListing from "./pages/AgentListing";
import AgentSold from "./pages/AgentSold";
import Communities from "./pages/Communities";
import Mls from "./pages/Mls";
import InternalServerError from "./pages/InternalError/InternalServerError";
import MlsPropertyDetail from "./pages/MlsPropertyDetail";
import GlobalPartner from "./pages/GlobalPartner";
import PropertyPress from "./pages/PropertyPress";
import SearchCommunity from "./pages/SearchCommunity";
import Allcommunities from "./pages/Home/AllCommunicaties";
import PropertyPressDetail from "./pages/PropertyPressDetail";
import ReportDetail from "./pages/ReportDetail";
import AddTestimonial from "./pages/Admin/AddTestimonial";
import Animation from "./components/Animation";
import "./App.css";
import { AnimatePresence } from "framer-motion";
function App() {
  const location = useLocation();
  let isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    AOS.init({
      once: true, // whether animation should happen only once
    });
  }, []);

  return (
    <>
      {!isAdminRoute && <Header />}
      <TopToScroll>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Home />} exact />
            <Route
              path="/contact-us"
              element={
                <Animation>
                  <ContactUs />
                </Animation>
              }
            />
            <Route
              path="/features/:id"
              element={
                <Animation>
                  <DetailProperty />
                </Animation>
              }
            />
            <Route
              path="/meet-the-team"
              element={
                <Animation>
                  <Agents />
                </Animation>
              }
            />
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/admin/signup" element={<Signup />} />
            <Route
              path="/our-story"
              element={
                <Animation>
                  <OurStory />
                </Animation>
              }
            />
            <Route
              path="/agent/:id"
              element={
                <Animation>
                  <AgentProfile />
                </Animation>
              }
            />
            <Route
              path="/properties"
              element={
                <Animation>
                  <Properties />
                </Animation>
              }
            />
            <Route
              path="/sold-properties"
              element={
                <Animation>
                  <SoldProperties />
                </Animation>
              }
            />
            <Route
              path="/boat-owner"
              element={
                <Animation>
                  <BoatOwners />
                </Animation>
              }
            />
            <Route
              path="/my-listing/:name/:id"
              element={
                <Animation>
                  <AgentListing />
                </Animation>
              }
            />
            <Route
              path="/my-sold/:name/:id"
              element={
                <Animation>
                  <AgentSold />
                </Animation>
              }
            />
            <Route
              path="/community/:id"
              element={
                <Animation>
                  <Communities />
                </Animation>
              }
            />
            <Route path="/500" element={<InternalServerError />} />
            <Route path="/global" element={<GlobalPartner />} />
            <Route
              path="/all-communities"
              element={
                <Animation>
                  <Allcommunities />
                </Animation>
              }
            />
            <Route
              path="/mls-listing"
              element={
                <Animation>
                  <Mls />
                </Animation>
              }
            />
            <Route
              path="/mls-detail/:id"
              element={
                <Animation>
                  <MlsPropertyDetail />
                </Animation>
              }
            />
            <Route
              path="/ourMarket"
              element={
                <Animation>
                  <PropertyPress />
                </Animation>
              }
            />
            <Route
              path="/ourMarket/:id"
              element={
                <Animation>
                  <PropertyPressDetail />
                </Animation>
              }
            />
            <Route path="/searchcommunity" element={<SearchCommunity />} />
            <Route path="/agent/blog/:id" element={<AgentBlog />} />
            <Route path="/reports/:id" element={<ReportDetail />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<Dashboard />}>
              <Route
                path="/admin/dashboard"
                element={
                  <h1 style={{ textAlign: "center", margin: "16px 0" }}>
                    Welcome to the Admin Panel
                  </h1>
                }
              />
              <Route path="/admin/community" element={<Filter />} />
              <Route path="/admin/community/add" element={<AddFilter />} />
              <Route path="/admin/community/edit/:id" element={<AddFilter />} />
              <Route path="/admin/agent" element={<Agent />} />
              <Route path="/admin/agent/add" element={<AddAgent />} />
              <Route path="/admin/agent/edit/:id" element={<AddAgent />} />
              <Route path="/admin/property" element={<PropertyList />} />
              <Route path="/admin/property/add" element={<AddProperty />} />
              <Route
                path="/admin/property/edit/:id"
                element={<AddProperty />}
              />
              <Route path="/admin/press" element={<Press />} />
              <Route path="/admin/inquiry" element={<Inquiries />} />
              <Route path="/admin/blog" element={<Blog />} />
              <Route path="/admin/report" element={<Report />} />
              <Route path="/admin/Testimonial" element={<AddTestimonial />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </TopToScroll>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
