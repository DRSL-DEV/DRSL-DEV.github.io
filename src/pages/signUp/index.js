import { useState } from 'react';
import { Form } from "antd";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import CheckBox from "../../components/Checkbox";
import GoogleIcon from "../../assets/icons/Google icon.svg";
import PageHeader from "../../components/PageHeader";
import styles from "./index.module.css";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage = () => {
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState('');

  const handleCredentials = (changedValues, allValues) => {
    setUserCredentials(allValues);
  }

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    setError('');
    const { email, password } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleGoogleSignUp = () => {
    //Code here for Google Sign Up
  };

  return (
    <div className="page-container">
      <main>
        <PageHeader title="Create an Account" />

        <section className={styles["signup-form-section"]}>
          <Form name="signup" onFinish={onFinish} onValuesChange={handleCredentials} layout="vertical">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
              ]}
            >
              <TextInput placeholder="Username" permittedLength={20} />
            </Form.Item>

            <Form.Item name="anonymousSubmissionCheck">
              <CheckBox checkboxText="Optional: Display account as anonymous. This can be changed at any time." />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <EmailInput placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password cannot be empty" },
                { min: 6, message: "Password must be at least 6 characters" }
              ]}
            >
              <PasswordInput placeholder="Password" />
            </Form.Item>


            <Form.Item
              name="ConfirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please re-enter your password to confirm",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <PasswordInput placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item name="tAndcCheck">
              <CheckBox checkboxText="I read and agree to the privacy policy, terms of service, and community guidelines." />
            </Form.Item>
            <Form.Item>
              <PrimaryButton text="Sign Up" htmlType="submit" />
            </Form.Item>
          </Form>
        </section>

        {
          error && <div className={styles.error}>{error}</div>
        }

        <section className={styles["signup-other-section"]}>
          <h4>Sign Up with</h4>
          <div className={styles["social-signup-icons"]}>
            <img
              src={GoogleIcon}
              alt="Google Icon"
              onClick={handleGoogleSignUp}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUpPage;
