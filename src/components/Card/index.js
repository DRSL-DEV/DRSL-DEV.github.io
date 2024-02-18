import React from "react";
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

const Card = ({ title, content, author, imgSrc, type }) => {
  const cardClass = `customized-card ${type}`;

  return (
    <div className={cardClass}>
      <div className="customized-card-image">
        <img src={imgSrc} alt="" />
      </div>
      <div className="customized-card-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="customized-card-footer">
          <div>{author}</div>
          <button>
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
