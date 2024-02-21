import styles from "./index.module.css";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import GoogleIcon from "../../assets/icons/Google icon.svg";
import FacebookIcon from "../../assets/icons/Facebook icon.svg";
import TwitterIcon from "../../assets/icons/Twitter icon.svg";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import PageHeader from "../../components/PageHeader";
import { Form } from "antd";

const LoginPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="page-container">
      <section className={styles["login-header-section"]}>
        <PageHeader title="Login" />
        <p className={styles["page-description"]}>
          Login or Sign up to continue.
        </p>
      </section>

      <section className={styles["login-form-section"]}>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <EmailInput placeholder="Email" />
          </Form.Item>

          <PasswordInput name="password" placeholder="Password" />

          <PrimaryButton text="Login" htmlType="submit" />
        </Form>
      </section>

      <section className={styles["login-other-section"]}>
        <p className={styles["help-text"]}>
          Don't have an account? &nbsp;<Link to="/signup">Sign up</Link>
        </p>

        <div className={styles["other-login"]}>
          <h4>Login with</h4>
          <div className={styles["social-login-icons"]}>
            <img src={GoogleIcon} alt="Google Icon" />
            {/* <img src={FacebookIcon} alt="Facebook Icon" /> */}
            {/* <img src={TwitterIcon} alt="Twitter Icon" /> */}
          </div>
          <p className={styles["help-text"]}>Contact Support</p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
