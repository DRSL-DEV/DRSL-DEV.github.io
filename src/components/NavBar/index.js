import logo_with_text from "../../assets/images/logo_with_text.svg";
import menu from "../../assets/icons/menu.svg";
import search from "../../assets/icons/search.svg";
import profile from "../../assets/icons/profile.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "../Menu";
import styles from "./index.module.css";

const NavBar = ({ isMenuOpen, setIsMenuOpen }) => {

  const user = useSelector((state) => state.userInfo.user);
  const loginLink = user ? "/profile" : "/login";

  return (
    <div className={styles["navbar-container"]}>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <Link to="/">
        <img src={logo_with_text} alt="logo_with_text" />
      </Link>
      <div className={styles["icons-container"]}>
        <Link to="/search">
          <img src={search} alt="search" />
        </Link>

        <Link to={loginLink}>
          <img src={profile} alt="login" />
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
