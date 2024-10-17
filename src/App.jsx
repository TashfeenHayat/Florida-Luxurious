import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import "./App.css";

function App() {
  const location = useLocation();
  let isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    AOS.init({
      once: true, // whether animation should happen only once
    });
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 },
  };

  const transition = { duration: 0.5 };

  return (
    <>
      {!isAdminRoute && <Header />}
      <TopToScroll>
        <AnimatePresence>
          <Routes location={location} key={location.key}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <Home />
                </motion.div>
              }
              exact
            />
            <Route
              path="/contact-us"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <ContactUs />
                </motion.div>
              }
            />
            <Route
              path="/features/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <DetailProperty />
                </motion.div>
              }
            />
            <Route
              path="/meet-the-team"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <Agents />
                </motion.div>
              }
            />
            <Route
              path="/admin/login"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <LoginAdmin />
                </motion.div>
              }
            />
            <Route
              path="/admin/signup"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <Signup />
                </motion.div>
              }
            />
            <Route
              path="/our-story"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <OurStory />
                </motion.div>
              }
            />
            <Route
              path="/agent/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <AgentProfile />
                </motion.div>
              }
            />
            <Route
              path="/properties"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <Properties />
                </motion.div>
              }
            />
            <Route
              path="/sold-properties"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <SoldProperties />
                </motion.div>
              }
            />
            <Route
              path="/boat-owner"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <BoatOwners />
                </motion.div>
              }
            />
            <Route
              path="/my-listing/:name/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <AgentListing />
                </motion.div>
              }
            />
            <Route
              path="/my-sold/:name/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <AgentSold />
                </motion.div>
              }
            />
            <Route
              path="/community/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <Communities />
                </motion.div>
              }
            />
            <Route path="/500" element={<InternalServerError />} />
            <Route
              path="/global"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <GlobalPartner />
                </motion.div>
              }
            />
            <Route
              path="/all-communities"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <Allcommunities />
                </motion.div>
              }
            />
            <Route
              path="/mls-listing"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <Mls />
                </motion.div>
              }
            />
            <Route
              path="/mls-detail/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <MlsPropertyDetail />
                </motion.div>
              }
            />
            <Route
              path="/ourMarket"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <PropertyPress />
                </motion.div>
              }
            />
            <Route
              path="/ourMarket/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <PropertyPressDetail />
                </motion.div>
              }
            />
            <Route
              path="/searchcommunity"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <SearchCommunity />
                </motion.div>
              }
            />
            <Route
              path="/agent/blog/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <AgentBlog />
                </motion.div>
              }
            />
            <Route
              path="/reports/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={transition}
                >
                  <ReportDetail />
                </motion.div>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route element={<Dashboard />}>
              <Route
                path="/admin/dashboard"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <h1 style={{ textAlign: "center", margin: "16px 0" }}>
                      Welcome to the Admin Panel
                    </h1>
                  </motion.div>
                }
              />
              <Route
                path="/admin/community"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <Filter />
                  </motion.div>
                }
              />
              <Route
                path="/admin/community/add"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <AddFilter />
                  </motion.div>
                }
              />
              <Route
                path="/admin/community/edit/:id"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <AddFilter />
                  </motion.div>
                }
              />
              <Route
                path="/admin/agent"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <Agent />
                  </motion.div>
                }
              />
              <Route
                path="/admin/agent/add"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <AddAgent />
                  </motion.div>
                }
              />
              <Route
                path="/admin/agent/edit/:id"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <AddAgent />
                  </motion.div>
                }
              />
              <Route
                path="/admin/property"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <PropertyList />
                  </motion.div>
                }
              />
              <Route
                path="/admin/property/add"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <AddProperty />
                  </motion.div>
                }
              />
              <Route
                path="/admin/property/edit/:id"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <AddProperty />
                  </motion.div>
                }
              />
              <Route
                path="/admin/press"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <Press />
                  </motion.div>
                }
              />
              <Route
                path="/admin/inquiry"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <Inquiries />
                  </motion.div>
                }
              />
              <Route
                path="/admin/blog"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <Blog />
                  </motion.div>
                }
              />
              <Route
                path="/admin/report"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <Report />
                  </motion.div>
                }
              />
              <Route
                path="/admin/Testimonial"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={transition}
                  >
                    <AddTestimonial />
                  </motion.div>
                }
              />
            </Route>
          </Routes>
        </AnimatePresence>
      </TopToScroll>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
