import React from 'react';
import { Form, Input, Button } from 'antd';
import back from "../../assets/icons/back.svg";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import TextInput from '../../components/TextInput';
import PrimaryButton from '../../components/PrimaryButton';
import CheckBox from '../../components/Checkbox';
import GoogleIcon from "../../assets/icons/Google icon.svg";


const SignUpPage = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        //Code here for Firebase Authentication
    };

    const checkStyle = { width: '310px', textAlign: 'left' };


    const handleGoogleSignUp = () => { 
        //Code here for Google Sign Up
    };

    return (
        <div>
            <main>
                <section className="page-container">
                    <div className="titleContainer">
                        <Link to="/">
                            <img src={back} alt="back" />
                        </Link>
                        <h1>Create an Account</h1>
                    </div>
                    <div className="form-container">
                        <Form
                            name="signup"
                            onFinish={onFinish}
                            layout="vertical"
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your username',
                                    },
                                ]}
                            >
                                <TextInput placeholder="Username" permittedLength={20} />
                            </Form.Item>


                            <Form.Item
                                name="anonymousSubmissionCheck"
                            >
                                <CheckBox checkboxText="Optional: Display account as anonymous. This can be changed at any time." styleProp={checkStyle} />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email' },
                                    { type: 'email', message: 'Please enter a valid email' },
                                ]}
                            >
                                <EmailInput placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your password',
                                    },
                                    {
                                        min: 8,
                                        message: 'Password must be at least 8 characters',
                                    },
                                ]}
                            >
                                <PasswordInput placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                name="ConfirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please re-enter your password to confirm',
                                    },
                                    {
                                        type: 'password',
                                        message: 'Passwords do not match',
                                    },
                                ]}
                            >
                                <PasswordInput placeholder="Confirm Password" />
                            </Form.Item>

                            <Form.Item
                                name="tAndcCheck"
                            >
                                <CheckBox checkboxText="I read and agree to the privacy policy, terms of service, and community guidelines." styleProp={checkStyle} />
                            </Form.Item>
                            <Form.Item>
                                <PrimaryButton text="Sign Up" htmlType="submit" />
                            </Form.Item>
                        </Form>

                        <div className="social-signUp">
                        <h3> OR </h3>
                        <button className="google-signup-button" onClick={handleGoogleSignUp}>
                            <img src={GoogleIcon} alt="Google Icon" />
                            Sign Up with Google
                        </button>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
};

export default SignUpPage;
