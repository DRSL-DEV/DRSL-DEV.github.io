import "./index.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="page-container">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-message">
        Sorry, the page you are looking for does not exist.
        <br />
        You can always go back to the{" "}
        <Link to="/" className="not-found-link">
          homepage
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFoundPage;
