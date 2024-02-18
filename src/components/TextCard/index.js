import React from "react";
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

const TextCard = ({ title, previewContent, author, pfpSource, date }) => {
  return (
    <div className="storypost-card">
        <div className="textpost-content">
            <h2>{title}</h2>
                <p>
                    {previewContent}
                </p>
        </div>

        <div className="user-info">
            <img className="profile-pic" alt="Profile pic" src={pfpSource} />
            <div className="post-info">
                <div className="usernamae">{author}</div>
                <div className="post-date">{date}</div>
            </div>
        </div>

        <div className="card-footer">
          <button>
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </button>
        </div>
        
    </div>
  );
  
};

export default TextCard;
