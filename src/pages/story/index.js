import image_placeholder from "../../assets/images/image_placeholder.png";
import StoryHeader from "../../components/StoryHeader";
import StoryInfo from "../../components/StoryInfo";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const StoryPage = () => {
  return (
    <div className="page-container">
      <Link to="/story/story-detail">
        <p>Story With Image</p>
      </Link>
    </div>
  );
};

export default StoryPage;
