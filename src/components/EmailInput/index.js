import { Input } from "antd";
import styles from "./index.module.css";

const EmailInput = ({ placeholder, value, onChange }) => {
  const inputStyle = {
    width: "100%",
    height: "46px",
    marginTop: "12px",
    borderRadius: "30px",
  };

  return (
    <Input
      type="email"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={inputStyle}
      className={styles["custom-email-input"]}
    />
  );
};

export default EmailInput;
