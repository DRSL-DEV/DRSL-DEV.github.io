import { Checkbox } from "antd";

const CheckBox = ({ checkboxText, styleProp, onChangeActions }) => {
  return <Checkbox onChange={onChangeActions}>{checkboxText}</Checkbox>;
};
export default CheckBox;
