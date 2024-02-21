import { Form } from "antd";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import CheckBox from "../../components/Checkbox";
import GoogleIcon from "../../assets/icons/Google icon.svg";
import PageHeader from "../../components/PageHeader";
import styles from "./index.module.css";

const SignUpPage = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    //Code here for Firebase Authentication
  };

  const handleGoogleSignUp = () => {
    //Code here for Google Sign Up
  };

  return (
    <div className="page-container">
      <main>
        <PageHeader title="Create an Account" />

        <section className={styles["signup-form-section"]}>
          <Form name="signup" onFinish={onFinish} layout="vertical">
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
                {
                  required: true,
                  message: "Please enter your password",
                },
                {
                  min: 8,
                  message: "Password must be at least 8 characters",
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
                  message: "Please re-enter your password to confirm",
                },
                {
                  type: "password",
                  message: "Passwords do not match",
                },
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
