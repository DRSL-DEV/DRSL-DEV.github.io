import { useState, useEffect } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/unauthorized";
import MapPage from "./pages/map";
import AuthListener from "./components/AuthListener";

const FooterWithCondition = () =>
  ["/login", "/signup", "/map"].includes(useLocation().pathname) ? null : (
    <Footer />
  );

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelector("#App").scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div className="App" id="App">
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="routes-wrapper">
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <AuthListener>
                  <LoginPage />
                </AuthListener>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthListener>
                  <SignUpPage />
                </AuthListener>
              }
            />
            <Route path="/story/:title" element={<StoryDetailPage />} />
            <Route path="/profile/:username?" element={<ProfilePage />} />
            <Route path="/profile/profile-edit" element={<EditProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/site-page" element={<SitePage />} />
            <Route path="/create-story" element={<CreateStory />} />
            <Route path="/explore-story" element={<ExploreStory />} />
            <Route
              path="/admin-page"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path="/admin-page" element={<AdminPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route
              path="/admin-page/admin-story-detail/:title"
              element={
                <ProtectedRoute>
                  <AdminStoryDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-page/admin-reject-form/:title"
              element={
                <ProtectedRoute>
                  <AdminRejectForm />
                </ProtectedRoute>
              }
            />

            {/* 404 or default page */}
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/403" element={<UnauthorizedPage />} />
          </Routes>
        </div>
        <FooterWithCondition />
      </div>
    </Router>
  );
}

export default App;
