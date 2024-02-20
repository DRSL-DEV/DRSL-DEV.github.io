import React from 'react';
import { Form, Input } from 'antd';

const PasswordInput = ({ name, placeholder, value, onChange }) => {
    const inputStyle = {
        width: '310px',
        height: '46px',
        marginTop: '12px',
        borderRadius: '30px',
    };

    const defaultRules = [
        { required: true, message: 'Password cannot be empty' },
    ];

    return (
        <Form.Item
            name={name}
            rules={defaultRules}
        >
            <Input.Password placeholder={placeholder} style={inputStyle} />
        </Form.Item>
    );
};

export default PasswordInput;
