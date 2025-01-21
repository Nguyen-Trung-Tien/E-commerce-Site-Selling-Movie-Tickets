import React from "react";
import { Checkbox } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import imag from "../../assets/images/test.jpg";
import {
  WrapperListOrder,
  WrapperStyleHeader,
  WrapperLeft,
  WrapperRight,
  WrapperInfo,
  WrapperTotal,
  WrapperPriceDiscount,
  WrapperItemOrder,
  WrapperCountOrder,
} from "./style";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import { WrapperInputNumber } from "../../component/ProductDetailComponent/style";

const OrderPage = ({ count = 1 }) => {
  const onChange = (e) => {
    console.log("Checkbox changed:", e.target.checked);
  };

  const handleChangeCount = (action) => {};

  const handleOnChangeCheckAll = (e) => {};

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox onChange={handleOnChangeCheckAll} />
                <span>Tất cả ({count}) sản phẩm </span>
              </span>
              <div style={{ flex: 1, display: "flex", justifyContent: "end" }}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              <WrapperItemOrder>
                <div
                  style={{
                    width: "390px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox />
                  <img
                    src={imag}
                    alt="Product"
                    style={{
                      width: "77px",
                      height: "79px",
                      objectFit: "cover",
                    }}
                  />
                  <div></div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <span>
                    <span style={{ fontSize: "13px", color: "#242424" }}>
                      <WrapperPriceDiscount></WrapperPriceDiscount>
                    </span>
                    <WrapperCountOrder>
                      <button>
                        <MinusOutlined
                          style={{ color: "#000", fontSize: "20px" }}
                        />
                      </button>
                      <WrapperInputNumber
                        defaultValue={1}
                        min={1}
                        max={10}
                        onChange={onChange}
                      />
                      <button
                        style={{ border: "none", background: "transparent" }}
                      >
                        <PlusOutlined
                          style={{ color: "#000", fontSize: "20px" }}
                        />
                      </button>
                    </WrapperCountOrder>
                  </span>
                  <DeleteOutlined
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  />
                </div>
              </WrapperItemOrder>
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  ></span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Giảm giá</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    0₫
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Thuế</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    300,000₫
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{ color: "rgb(254, 56, 52)", fontSize: "24px" }}
                  ></span>
                  <span style={{ color: "#000", fontSize: "14px" }}>
                    đã bao gồm
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              // onClick={() => {}}
              size={40}
              textButton="Mua hàng"
              styleTextButton={{
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              styleButton={{
                width: "100%",
                background: "#f00",
                height: "48px",
                border: "none",
                borderRadius: "4px",
              }}
            />
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
