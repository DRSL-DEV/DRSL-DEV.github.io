import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import back from "../../assets/icons/back.svg";
import { Link } from "react-router-dom";
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import PrimaryButton from "../../components/PrimaryButton";
import GoogleIcon from "../../assets/icons/Google icon.svg";
import FacebookIcon from "../../assets/icons/Facebook icon.svg";
import TwitterIcon from "../../assets/icons/Twitter icon.svg";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(credentials);
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
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <InputGroup>
                        <Form.Control
                            type="email"
                            placeholder="Username or Email"
                            className="input"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <InputGroup>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            className="input"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Form.Group>

                <Row className="mb-3 justify-content-between align-items-center">
                    <Col xs="auto">
                        <Form.Check
                            type="checkbox"
                            id="rememberMe"
                            label="Remember me"
                            className="help-text"
                            onChange={handleRememberMeChange}
                            checked={rememberMe}
                        />
                    </Col>
                    <Col xs="auto">
                        <Link to="/forgot-password" className="help-text">Forget password?</Link>
                    </Col>
                </Row>

                <PrimaryButton text="Login" onClick={handleSubmit} />
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