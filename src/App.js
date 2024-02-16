import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import SitePage from "./pages/site-page";
import CreateStory from "./pages/create-story";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="routes-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/story/story-detail" element={<StoryDetailPage />} />
            <Route path="/site-page" element={<SitePage />} />
            <Route path="/create-story" element={<CreateStory />} />

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
