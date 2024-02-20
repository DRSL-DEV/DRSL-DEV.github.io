import React, { useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import back from "../../assets/icons/back.svg";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import GoogleIcon from "../../assets/icons/Google icon.svg";
import FacebookIcon from "../../assets/icons/Facebook icon.svg";
import TwitterIcon from "../../assets/icons/Twitter icon.svg";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import { Form } from 'antd';

const LoginPage = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <div className="pageWrapper">
            <div className="titleContainer">
                <Link to="/">
                    <img src={back} alt="back" />
                </Link>
                <h1 className="pageTitle">Login</h1>
            </div>
            <p className="pageDescription">Login or Sign up to continue.</p>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <EmailInput placeholder="Email" />
                </Form.Item>

                <PasswordInput
                    name="password"
                    placeholder="Password"
                />

                <PrimaryButton text="Login" htmlType="submit" />
            </Form>
            <p className="help-text">
                Don't have an account?
                <Link to="/signup"> Sign up</Link>
            </p>
            <div className="other-login">
                <h4>Login with</h4>
                <div className="social-login-icons">
                    <img src={GoogleIcon} alt="Google Icon" />
                    {/* <img src={FacebookIcon} alt="Facebook Icon" />
                    <img src={TwitterIcon} alt="Twitter Icon" /> */}
                </div>
                <p className="help-text">Contact Support</p>
            </div>
        </div>
    )
}

export default LoginPage;