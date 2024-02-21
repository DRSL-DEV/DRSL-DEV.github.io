import styles from "./index.module.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="page-container">
      <h1 className={styles["not-found-title"]}>
        404 - This Page Is Underwater
      </h1>
      <p className={styles["not-found-message"]}>
        Like some secrets of the Detroit River, this page is hidden from view.
        <br />
        Dive back into our{" "}
        <Link to="/" className={styles["not-found-link"]}>
          home page
        </Link>{" "}
        to surface more stories. .
      </p>
    </div>
  );
};

export default NotFoundPage;
