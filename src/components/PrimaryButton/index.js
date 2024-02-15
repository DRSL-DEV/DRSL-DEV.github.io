import React from 'react';
import './index.css';

const PrimaryButton = ({ text, onClick }) => {
    return (
        <button className="primary-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default PrimaryButton;
