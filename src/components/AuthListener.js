import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const AuthListener = ({ children }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to the home page
        navigate("/");
        if (user.displayName) {message.success({
          content: `Successfully signed in as ${user.displayName}!`,
          duration: 2,
        }); } else{
          message.success({
            content: `Signup successful!`,
            duration: 2,
          });
        }
             } else {
        // User is signed out
        // Handle sign-out or maintain current state
        
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return children;
};

export default AuthListener;
