import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
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
import Footer from "./components/Footer";
import StoryDetailPage from "./pages/storyDetail";
import LoginPage from "./pages/login";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <NavBar setIsMenuOpen={setIsMenuOpen} />
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

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
            <Route path="/privacy" element={<PrivacyPage />} />{" "}
            <Route path="/story/story-detail" element={<StoryDetailPage />} />
            {/* 404 or default page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
