import { useState, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../data/features/userInfoSlice";
import { db } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";


const SignUpPage = () => {
  const [form] = Form.useForm();
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");

  const user = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.state?.from || "/";

  const handleCredentials = (changedValues, allValues) => {
    setUserCredentials(allValues);
  };

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    setError("");
    const { email, password, username, anonymousSubmissionCheck } = values;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;

        setDoc(doc(db, "user", user.uid), {
          username: username,
          email: email,
          anonymousSubmissionCheck: anonymousSubmissionCheck,
          isAdmin: false,
        })
          .then(() => {
            // console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        const userInfo = {
          uid: user.uid,
          username,
          email,
          anonymousSubmissionCheck,
          isAdmin: false,
        };
        dispatch(setUser(userInfo));
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate(redirect);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  //Google SignUp
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;        
          const userInfo = {
            uid: auth.currentUser.uid,
            username: auth.currentUser.displayName,
            email: auth.currentUser.email,
            anonymousSubmissionCheck: auth.currentUser.isAnonymous,
            isAdmin: false,
          };

          console.log("userInfo:", userInfo);
          // @TODO: You can now store the user info in your Firestore database
          // @TODO: redirect to home page
          setDoc(doc(db, "user", userInfo.uid), {
            username: userInfo.username,
            email: userInfo.email,
            anonymousSubmissionCheck: userInfo.anonymousSubmissionCheck,
            isAdmin: userInfo.isAdmin,
          })
            .then(() => {
              // console.log("Document successfully written!");
              // navigate(redirect);
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          dispatch(setUser(userInfo));
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
        setWelcomeMessage(`Welcome! Now logged in as ${auth.currentUser.displayName}!`);
            
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  }, []);
    //Google SignUp

  const handleGoogleSignUp = () => {
    //Code here for Google Sign Up
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="page-container">
      <main>
        <PageHeader title="Create an Account" />

        <section className={styles["signup-form-section"]}>
          <Form
            name="signup"
            onFinish={onFinish}
            onValuesChange={handleCredentials}
            layout="vertical"
            initialValues={{
              username: user?.username,
              email: user?.email,
              anonymousSubmissionCheck: !!user?.anonymousSubmissionCheck,
            }}
          >
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

            <Form.Item
              name="anonymousSubmissionCheck"
              valuePropName="checked"
              getValueFromEvent={(e) => e.target.checked}
            >
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
                { min: 6, message: "Password must be at least 6 characters" },
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
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <PasswordInput placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item
              name="tAndcCheck"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message:
                    "You must agree to the privacy policy, terms of service, and community guidelines to sign up.",
                },
              ]}
            >
              <CheckBox checkboxText="I read and agree to the privacy policy, terms of service, and community guidelines." />
            </Form.Item>
            <Form.Item>
              <PrimaryButton text="Sign Up" htmlType="submit" />
            </Form.Item>
          </Form>
        </section>

        {error && <div className={styles.error}>{error}</div>}

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
