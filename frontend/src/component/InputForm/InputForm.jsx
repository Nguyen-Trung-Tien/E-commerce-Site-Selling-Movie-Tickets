import React, { useState } from "react";
import { Input } from "antd";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  const [valueInput, setValueInput] = useState("");
  const { placeholder = "Nhập thông tin", ...rest } = props;
  return (
    <WrapperInputStyle
      placeholder={placeholder}
      valueInput={props.valueInput}
      {...rest}
    />
  );
};

export default InputForm;
