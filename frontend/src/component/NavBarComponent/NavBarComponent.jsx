import React from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";

const NavBarComponent = () => {
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });

      case "checkbox":
        return options.map((option) => {
          return (
            <Checkbox.Group
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
              onChange={onChange}
            >
              {options.map((option) => {
                return (
                  <Checkbox style={{ marginLeft: 0 }} value={option.value}>
                    {option.label}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          );
        });

      case "star":
        return options.map((option) => {
          return (
            <div style={{ display: "flex", gap: "10px" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
              <span>{`từ ${option} sao`}</span>
            </div>
          );
        });

      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });

      default:
        return null;
    }
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <WrapperLabelText>Thể Loại Phim</WrapperLabelText>
      <WrapperContent>
        {renderContent("text", [
          "Phim hành động",
          "Phim hoạt hình",
          "Phim Drama",
          "Phim điện ảnh",
        ])}
      </WrapperContent>
      {/* <WrapperContent>
        {renderContent("checkbox", [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ])}
      </WrapperContent>
      <WrapperContent>{renderContent("star", [3, 4, 5])}</WrapperContent>
      <WrapperContent>
        {renderContent("price", ["dưới  50.000", "100.000", "trên 200.000"])}
      </WrapperContent> */}
    </div>
  );
};

export default NavBarComponent;
