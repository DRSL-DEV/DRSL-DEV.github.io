import { Form, Input } from "antd";

const PasswordInput = ({ placeholder, value, onChange }) => {
  const inputStyle = {
    width: "100%",
    height: "46px",
    marginTop: "12px",
    borderRadius: "30px",
  };

  const defaultRules = [
    { required: true, message: "Password cannot be empty" },
    { min: 6, message: "Password must be at least 6 characters" }
  ];

  return (
    <Input.Password
      placeholder={placeholder}
      style={inputStyle}
      onChange={onChange}
      value={value}
    />
  );
};

export default PasswordInput;
