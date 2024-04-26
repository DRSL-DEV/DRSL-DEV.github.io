import { Input } from "antd";

const PasswordInput = ({ placeholder, value, onChange }) => {
  const inputStyle = {
    width: "100%",
    height: "46px",
    marginTop: "12px",
    borderRadius: "30px",
  };

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
