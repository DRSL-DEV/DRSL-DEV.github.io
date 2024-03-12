import { Checkbox } from "antd";

const CheckBox = ({ checkboxText, checked, onChange }) => {
  return <Checkbox checked={checked} onChange={onChange}>{checkboxText}</Checkbox>;
};
export default CheckBox;
