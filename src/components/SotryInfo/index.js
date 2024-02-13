import React from "react";
import profile from "../../assets/images/profile.png";
import "./index.css";

const StoryInfo = () => {
  return(
    <div className="storyInfoContainer">
      <div className="profileCropper">
        <img src={profile} alt="profile image" />
      </div>
      <div className="infoText">
        <p>username</p>
        <p>02/13/2023</p>
      </div>
    </div>
  );
};

export default StoryInfo;