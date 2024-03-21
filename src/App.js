import { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import AboutPage from "./pages/about";
import NotFoundPage from "./pages/default";
import ContactPage from "./pages/contact";
import PartnershipsPage from "./pages/partnerships";
import SearchPage from "./pages/search";
import PrivacyPage from "./pages/privacy";
import StoryDetailPage from "./pages/story-detail";
import LoginPage from "./pages/login";
import SitePage from "./pages/site-page";
import CreateStory from "./pages/create-story";
import SignUpPage from "./pages/sign-up";
import EditProfilePage from "./pages/edit-profile";
import AdminPage from "./pages/admin-page";
import AdminStoryDetailPage from "./pages/admin-story-detail";
import AdminRejectForm from "./pages/admin-reject-form";
import ExploreStory from "./pages/explore-story";

const FooterWithCondition = () =>
  ["/login", "/signup"].includes(useLocation().pathname) ? null : <Footer />;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="routes-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/story/:title" element={<StoryDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/profile-edit" element={<EditProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/site-page" element={<SitePage />} />
            <Route path="/create-story" element={<CreateStory />} />
            <Route path="/explore-story" element={<ExploreStory />} />
            <Route path="/admin-page" element={<AdminPage />} />
            <Route
              path="/admin-page/admin-story-detail/:title"
              element={<AdminStoryDetailPage />}
            />
            <Route
              path="/admin-page/admin-reject-form/:title"
              element={<AdminRejectForm />}
            />

            {/* 404 or default page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <FooterWithCondition />
      </div>
    </Router>
  );
}

export default App;
