import React from "react";
import image_placeholder from "../../assets/images/image_placeholder.png"
import StoryInfo from "../../components/SotryInfo";
import { Link } from "react-router-dom";
import "./index.css"

const StoryPage = () => {
  return(
    <div>
      <Link to="/story/story-detail">
        <p>Story With Image</p>
      </Link>
    </div>
  );
};

export default StoryPage;
