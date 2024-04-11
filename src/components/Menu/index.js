import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../data/features/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

// Menu items
const menuItems = [
  { name: "Share Your Story", link: "/create-story" },
  { name: "Explore Regional Stories", link: "/explore-site" },
  { name: "Station Map", link: "/map" },
];

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation(); // Get current location (routing location)
  const user = useSelector((state) => state.userInfo.user);

  //Signout button functionality

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsMenuOpen(false);
    dispatch(signOutUser());
    localStorage.removeItem("userInfo");
    navigate("/");
    message.success({
      content: `Successfully signed out!`,
      duration: 2,
    });
  };

  const menuRef = useRef();

  // Close the submenu when the menu is closed
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuIcon = document.querySelector("#menu_icon");
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        event.target !== menuIcon &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts or rerenders
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  // Check if the menu item is active
  const isActiveMenuItem = (item) => {
    if (item.link === location.pathname) {
      return true;
    }
    if (item.subMenu) {
      return item.subMenu.some((subItem) => subItem.link === location.pathname);
    }
    return false;
  };

  return (
    <div
      className={`${styles["menu-container"]} ${isMenuOpen ? styles.open : ""}`}
      ref={menuRef}
      onClick={(e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
      }}
    >
      {menuItems.map((item) => (
        <div key={item.name}>
          <Link
            to={item.link}
            className={`${styles["menu-item"]} ${
              isActiveMenuItem(item) ? styles["active-menu-item"] : ""
            }`}
            onClick={() => setIsMenuOpen(false)} // Close the menu
          >
            <h1>{item.name}</h1>
          </Link>
        </div>
      ))}
      {!!user && (
        <div>
          <div className={styles["menu-item"]} onClick={handleLogOut}>
            <h1 className={styles["sign-out"]}>Sign Out</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
