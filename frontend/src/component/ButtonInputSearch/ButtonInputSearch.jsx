import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton,
    bordered,
    backgroundColorInput = "#fff",
    backgroundColorButton = "rgb(13,95, 182)",
    ColorButton = "#fff",
  } = props;
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      <InputComponent
        placeholder={placeholder}
        size={size}
        style={{ backgroundColor: backgroundColorInput }}
      />
      <ButtonComponent
        size={size}
        styleButton={{
          background: backgroundColorButton,
          border: !bordered && "none",
        }}
        icon={<SearchOutlined color={ColorButton} style={{ color: "#fff" }} />}
        textButton={textButton}
        styleTextButton={{ color: ColorButton }}
      ></ButtonComponent>
    </div>
  );
};

export default ButtonInputSearch;
