import { Checkbox } from "antd";

const CheckBox = ({ checkboxText, checked, onChange, linkToDestination, linkText }) => {
  return <Checkbox checked={checked} onChange={onChange}>{checkboxText}<a href={linkToDestination}>{linkText}</a></Checkbox>;
};
export default CheckBox;
