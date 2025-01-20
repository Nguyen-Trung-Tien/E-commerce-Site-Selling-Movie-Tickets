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
const CardComponent = (props) => {
  const {
    name,
    price,
    description,
    image,
    rating,
    type,
    discount,
    seller,
    countInStock,
  } = props;

  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200 }}
      headStyle={{ width: "200px", height: "200px" }}
      bodyStyle={{ padding: "10px", marginTop: "-5px" }}
      cover={<img alt="example" src={image} />}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "10px" }}>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: "20px", color: "yellow" }} />
        </span>
        <WrapperStyleTextSell>|đã bán {seller || 1000} vé</WrapperStyleTextSell>
        <WrapperPriceText>
          <span style={{ marginRight: "10px" }}>{price.toLocaleString()}</span>

          <WrapperDiscountText>-{discount || 5}%</WrapperDiscountText>
        </WrapperPriceText>
      </WrapperReportText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
