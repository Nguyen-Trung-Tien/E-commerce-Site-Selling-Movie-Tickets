import Card from "antd/lib/card/Card";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
  width: 320px;
  &img {
    height: 200px;
    width: 200px;
  }
`;
export const StyleNameProduct = styled.div`
  font-weight: 300;
  font-size: 15px;
  line-height: 20px;
  color: rgb(56, 5661);
  margin-bottom: 10px;
  display: flex;
  font-weight: 500;
`;
export const WrapperReportText = styled.div`
  font-size: 16px;
  color: rgb(128, 128, 137);
  align-items: center;
  margin: 6px 0 0px;
`;
export const WrapperPriceText = styled.div`
  color: rgb(255, 66, 78);
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  margin: -5px;
`;

export const WrapperDiscountText = styled.span`
  color: rgb(255, 66, 78);
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
`;

export const WrapperStyleTextSell = styled.span`
  color: rgb(120, 120, 120);
  font-size: 15px;
  line-height: 24px;
`;
