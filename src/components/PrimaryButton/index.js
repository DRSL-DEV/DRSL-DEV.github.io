import React from 'react';
import './index.css';

const PrimaryButton = ({ text, htmlType, onClick }) => {
    return (
        <button className="primary-button" type={htmlType} onClick={onClick}>
            {text}
        </button>
    );
};

export default PrimaryButton;
