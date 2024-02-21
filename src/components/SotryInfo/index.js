import React from "react";
import "./index.css";

const StoryInfo = ({ title, author, profileImg, date, content, tags }) => {
  return (
    <div className="storyInfoContainer">
      <div className="postInfoTop">
        <div className="userInfo">
          <img src={profileImg} alt="profile image" />
          <div className="userInfoText">
            <p>{author}</p>
            <p>{date}</p>
          </div>
        </div>
        <div className="tagContainer">
          {tags.map((tag, index) => (
            <p className="storyTag" key={index}>
              {tag}
            </p>
          ))}
        </div>
      </div>
      <h1 className="storyTitle">{title}</h1>
      <p className="storyText">{content}</p>
    </div>
  );
};

export default StoryInfo;
