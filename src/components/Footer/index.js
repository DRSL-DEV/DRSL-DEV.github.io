import styles from "./index.module.css";
import logo_with_text from "../../assets/images/logo_with_text.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className={styles.links}>
        <Link to="https://sites.lsa.umich.edu/detroit-river-story-lab/" target="_blank">About Us</Link>
        <Link to="https://sites.lsa.umich.edu/detroit-river-story-lab/partners-2/organizational-partners/" target="_blank">Partnerships</Link>
        <Link to="https://sites.lsa.umich.edu/detroit-river-story-lab/about/contact/" target="_blank">Contact</Link>
        <Link to="https://drive.google.com/file/d/11sUXce2Jp89rdctj53oJdjNJKV7-2maS/view?usp=sharing" target="_blank">Privacy Statement</Link>
      </div>
      <div className={styles["bottom-info"]}>
        <img
          src={logo_with_text}
          alt="Logo"
          className={styles["footer-logo"]}
        />
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
