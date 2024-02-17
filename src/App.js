import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";
import HomePage from "./pages/home";
import StoryPage from "./pages/story";
import ProfilePage from "./pages/profile";
import AboutPage from "./pages/about";
import NotFoundPage from "./pages/default";
import ContactPage from "./pages/contact";
import PartnershipsPage from "./pages/partnerships";
import SearchPage from "./pages/search";
import PrivacyPage from "./pages/privacy";
import StoryDetailPage from "./pages/storyDetail";
import LoginPage from "./pages/login";
import SitePage from "./pages/site-page";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const FooterWithCondition = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return !isLoginPage ? <Footer /> : null;
  }

  return (
    <Router>
      <div className="App">
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="routes-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/story/story-detail" element={<StoryDetailPage />} />            <Route path="/site-page" element={<SitePage />} />

            {/* 404 or default page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
        <FooterWithCondition />
      </div>
    </Router>
  );
}

export default App;
