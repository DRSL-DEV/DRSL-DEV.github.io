import React from "react";
import './index.css';
import { useNavigate } from "react-router-dom";

const Button = ({ text, to }) => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className="button" onClick={handleClick}>
      {text}
    </button>
  );
};


export default Button;
