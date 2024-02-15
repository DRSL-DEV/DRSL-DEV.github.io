import React from "react";
import './index.css';

const GridCard = ({ title, imgSrc, type }) => {
  // const cardClass = `card ${type}`;

  return (
    <div className='grid-card'>
      <div className="grid-card-image">
        <img src={imgSrc} alt="" />
        <div className="grid-card-content">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default GridCard;
