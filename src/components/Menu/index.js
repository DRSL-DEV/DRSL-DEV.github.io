import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import submenu_arrow_up from "../../assets/icons/submenu_arrow_up.svg";
import submenu_arrow_down from "../../assets/icons/submenu_arrow_down.svg";
import "./index.css";

// Menu items
const menuItems = [
  { name: "Share Your Story", link: "/create-story" },
  { name: "Explore Regional Stories", link: "/story" },
  { name: "Station Map", link: "/map" },
  {
    name: "Learning Activities",
    link: "/learning",
    subMenu: [
      { name: "Quizzes", link: "/learning/quiz" },
      { name: "Site Scavenger Hunt", link: "/learning/site-hunt" },
      { name: "Partnered Programs", link: "/learning/partner-program" },
    ],
  },
  { name: "River Timeline", link: "/timeline" },
  { name: "River Podcasts", link: "/podcast" },
  {
    name: "About Us",
    link: "/about",
    subMenu: [
      { name: "Projects", link: "/about/project" },
      { name: "News", link: "/about/news" },
      { name: "Contact Information", link: "/about/contact-info" },
    ],
  },
  {
    name: "FAQ",
    link: "/faq",
  },
];

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [activeMenus, setActiveMenus] = useState({}); // Active submenus
  const location = useLocation(); // Get current location (routing location)

  // Close the submenu when the menu is closed
  useEffect(() => {
    if (!isMenuOpen) setActiveMenus({});
  }, [isMenuOpen]);

  const handleMenuClick = (item) => {
    // Toggle submenu
    setActiveMenus((prevActiveMenus) => ({
      ...prevActiveMenus,
      [item.name]: !prevActiveMenus[item.name],
    }));
  };

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

  // Check if the submenu is active
  const isSubMenuActive = (itemName) => !!activeMenus[itemName];

  return (
    <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
      {menuItems.map((item) => (
        <div key={item.name}>
          {/* check if the item has a submenu */}
          {item.subMenu ? (
            <>
              <h1
                className={`menu-item ${
                  isActiveMenuItem(item) ? "active-menu-item" : ""
                }`}
                onClick={() => handleMenuClick(item)}
              >
                {item.name}
                <img
                  className="submenu-arrow"
                  src={
                    isSubMenuActive(item.name)
                      ? submenu_arrow_up
                      : submenu_arrow_down
                  }
                  alt="Toggle Submenu"
                />
              </h1>

              {/*  If the submenu is active, show the submenu */}
              {isSubMenuActive(item.name) && (
                <div className="sub-menu">
                  {item.subMenu.map((subItem) => (
                    <Link
                      to={subItem.link}
                      key={subItem.name}
                      className="sub-menu-item"
                      onClick={() => setIsMenuOpen(false)} // Close the menu
                    >
                      <h2>{subItem.name}</h2>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            // If the item does not have a submenu, show the item
            <Link
              to={item.link}
              className={`menu-item ${
                isActiveMenuItem(item) ? "active-menu-item" : ""
              }`}
              onClick={() => setIsMenuOpen(false)} // Close the menu
            >
              <h1>{item.name}</h1>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
