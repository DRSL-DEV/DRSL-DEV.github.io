import logo_with_text from "../../assets/images/logo_with_text.svg";
import menu from "../../assets/icons/menu.svg";
import search from "../../assets/icons/search.svg";
import profile from "../../assets/icons/profile.svg";
import { Link } from "react-router-dom";
import Menu from "../Menu";
import "./index.css";

const NavBar = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="navbar-container">
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <Link to="/">
        <img src={logo_with_text} alt="logo_with_text" />
      </Link>
      <div className="icons-container">
        <img src={search} alt="search" />

        <Link to="/profile">
          <img src={profile} alt="profile" />
        </Link>

        <img
          src={menu}
          alt="menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default NavBar;
