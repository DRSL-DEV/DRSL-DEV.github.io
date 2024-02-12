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
            <Route path="/story" element={<StoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* 404 or default page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
