import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";

const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 196.5 }}
      headStyle={{ width: "200px", height: "200px" }}
      bodyStyle={{ padding: "10px", marginTop: "-5px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <StyleNameProduct>Gái già lắm chiêu</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "10px" }}>
          <span>4.0</span>
          <StarFilled style={{ fontSize: "20px", color: "yellow" }} />
        </span>
        <WrapperStyleTextSell>| Đã bán 500 vé</WrapperStyleTextSell>
        <WrapperPriceText>
          <br /> 90.000VND
          <WrapperDiscountText>-5%</WrapperDiscountText>
        </WrapperPriceText>
      </WrapperReportText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
