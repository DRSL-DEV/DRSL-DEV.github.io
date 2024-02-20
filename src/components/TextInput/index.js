import React from 'react';
import { Input } from 'antd';

const TextInput = ({ placeholder, value, onChange, permittedLength}) => {
    const inputStyle = {
        width: '310px',
        height: '46px',
        marginTop: '12px',
        borderRadius: '30px',
    };

    return (
        <Input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={inputStyle}
            className="custom-text-input"
            showCount
            maxLength={permittedLength}
        />
    );
};

export default TextInput;
