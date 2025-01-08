import styled from "styled-components";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
export const WrapperTypeProduct = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid white;
  height: 50px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: #ffff;
    background-color: rgb(13, 92, 182);
    span {
      color: #ffff;
    }
  }
  width: 100%;
  align-items: center;
`;

export const WrapperProducts = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
`;
