import { Input } from "antd";
import React from "react";

const InputComponent = ({ size, placeholder, brodered, style, ...rests }) => {
  return (
    <Input placeholder={placeholder} size={size} style={style} {...rests} />
  );
};

export default InputComponent;
