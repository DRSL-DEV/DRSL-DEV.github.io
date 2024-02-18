import React from 'react';
import { Input } from 'antd';
import './index.css';

const EmailInput = ({ placeholder, value, onChange }) => {
    const inputStyle = {
        width: '310px',
        height: '46px',
        marginTop: '12px',
        borderRadius: '30px',
    };

    return (
        <Input
            type="email"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={inputStyle}
            className="custom-email-input"
        />
    );
};

export default EmailInput;
