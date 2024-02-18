import "./index.css";
import logo_with_text from "../../assets/images/logo_with_text.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="links">
        <Link to="/about">About Us</Link>
        <Link to="/partnerships">Partnerships</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy Statement</Link>
      </div>
      <div className="bottom-info">
        <img src={logo_with_text} alt="Logo" className="footer-logo" />
        <span>
          @2024 Detroit River Story Lab.
          <br />
          All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
