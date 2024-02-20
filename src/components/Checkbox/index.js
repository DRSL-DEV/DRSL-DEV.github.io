import { Checkbox } from 'antd';
import React from 'react';

const CheckBox = ({ checkboxText, styleProp, onChangeActions}) => {
    return (
        <Checkbox onChange={onChangeActions} style={styleProp}>
            {checkboxText}
        </Checkbox>
    );
}
export default CheckBox;