import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Navbar from "./components/Navbar";
import Login from "./Pages/auth/Login";
import SignUp from "./Pages/auth/Signup";
import ShareProject from "./Pages/ShareProject";
import ClickedProject from "./Pages/ClickedProject";
import PersonalSpace from "./Pages/PersonalSpace";
import Connect from "./Pages/Connect";
import AuthorProfile from "./Pages/AuthorProfile";
import ThankYou from "./Pages/AfterLogout";
import LandingPage from "./Pages/LandingPage";
import ToggleExample from "./components/ToggleExample";
import About from "./Pages/About";
import Privacy from "./Pages/Privacy";
import ContactUs from "./Pages/Contact";
import Collab from "./Pages/Collab";
import DigestLandingPage from "./Pages/DigestLandingPage";
import BlogLandingPage from "./Pages/BlogLandingPage";
import MarkdownEditor from "./components/MarkdownEditor";
import ClickedArticle from "./Pages/ClickedArticle";
import NavbarArticle from "./components/NavbarArticle";
import Articles from "./Pages/Articles";

const App = () => {
  const location = useLocation();

  // Conditionally render Navbar based on current path
  const showNavbar =
    ![
      "/",
      "/login",
      "/signup",
      "/",
      "/thankyou",
      "/about",
      "/privacy",
      "/contact",
      "/collab",
      "/digest",
      "/digestlandingpage",
      "/articles",
    ].includes(location.pathname) && !location.pathname.startsWith("/article/");

  return (
    <div className="font-helvetica bg-gray-50">
      {/* Render Navbar only if the path is not /login or /signup */}
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shareproject" element={<ShareProject />} />
        <Route path="/project/:projectId" element={<ClickedProject />} />
        <Route path="/personalspace" element={<PersonalSpace />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/profile/:authorId" element={<AuthorProfile />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/collab" element={<Collab />} />
        <Route path="/digestlandingpage" element={<DigestLandingPage />} />
        <Route path="/digest" element={<BlogLandingPage />} />
        <Route path="/addBlog" element={<MarkdownEditor />} />
        <Route path="/articles" element={<Articles />} />
        <Route
          path="/article/:slug"
          element={
            <>
              <NavbarArticle />
              <ClickedArticle />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
