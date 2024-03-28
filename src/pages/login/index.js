import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../data/features/userInfoSlice";
import styles from "./index.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import GoogleIcon from "../../assets/icons/Google icon.svg";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import PageHeader from "../../components/PageHeader";
import { Form } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirect = location.state?.from || "/";

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      const userRef = doc(db, "user", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userInfo = {
          uid: user.uid,
          email: user.email,
          ...userDoc.data(),
        };
        dispatch(setUser(userInfo));
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        // navigate(redirect);
      } else {
        setError("User not found");
      }
    } catch (error) {
      setError(error.message);
    }
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

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Password cannot be empty" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <PasswordInput placeholder="Password" />
          </Form.Item>

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
          </div>
          {/* <p className={styles["help-text"]}>Contact Support</p> */}
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
