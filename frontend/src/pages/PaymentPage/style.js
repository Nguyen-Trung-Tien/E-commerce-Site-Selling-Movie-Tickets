import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 14px;
  }
`;

export const WrapperLeft = styled.div`
  width: 910px;
`;

export const WrapperListOrder = styled.div``;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
`;

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 6px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 255, 255);
  width: 500px;
  border-radius: 4px;
  height: 120px;
  padding: 16px;
  display: flex;
  font-weight: normal;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
  margin-left: 10px;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  border: 1px solid #ccc;
  border-radius: 4px;

  .ant-input-number {
    width: 40px;
    border: none;
    padding: 0;

    .ant-input-number-handler-wrap {
      display: none;
    }

    .ant-input-number-input {
      text-align: center;
      padding: 0;
    }
  }

  button {
    width: 40px;
    height: 30px;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }

    &:first-child {
      border-right: 1px solid #ccc;
    }

    &:last-child {
      border-left: 1px solid #ccc;
    }
  }
`;

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
`;

export const WrapperTotal = styled.div`
  display: flex;

  align-items: flex-start;
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
`;
