import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../data/features/userInfoSlice";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import GoogleIcon from "../../assets/icons/Google icon.svg";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import PageHeader from "../../components/PageHeader";
import { Form, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import { fetchUserById, addUser } from "../../data/features/userInfoSlice";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setErrorMsg("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      console.log("uid being dispatched to UserInfoSlice:", user.uid);

      dispatch(fetchUserById(user.uid)).then((result) => {

        console.log("User found? ", result.meta.requestStatus);

        console.log("FetchUserbyID result: ", result);
        if (result.meta.requestStatus === "fulfilled") {
          const userInfo = result.payload;
          console.log("User found: ", result.payload);
          dispatch(setUser(userInfo));
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
          setErrorMsg("Please double check your login credentials!");
          message.error({
            content: `Could not log in: ${errorMsg}`,
            duration: 2,
          })
        }

      });

    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  //Google Signin
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = credential.accessToken;
          // // The signed-in user info.
          console.log("uid being dispatched to UserInfoSlice:", auth.currentUser.uid);

          dispatch(fetchUserById(auth.currentUser.uid)).then((result) => {
            console.log("User found? ", result.meta.requestStatus);

            console.log("FetchUserbyID result: ", result);
            if (result.meta.requestStatus === "fulfilled") {
              console.log("User details: ", result.payload);

              const userInfo = result.payload;
              dispatch(setUser(userInfo));
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
            } else {
              console.log(result);
              const userInfo = {
                uid: auth.currentUser.uid,
                username: auth.currentUser.displayName,
                email: auth.currentUser.email,
                anonymousSubmissionCheck: auth.currentUser.isAnonymous,
                isAdmin: false,
              };
              console.log("Google user not found in Firestore, executing the signup flow instead:", userInfo);
              dispatch(addUser(userInfo));
              dispatch(setUser(userInfo));
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleGoogleSignIn = () => {
    signInWithRedirect(auth, provider);
  };
  //Google Signin

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
            <img src={GoogleIcon} alt="Google Icon" onClick={handleGoogleSignIn} />
          </div>
          {/* <p className={styles["help-text"]}>Contact Support</p> */}
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
