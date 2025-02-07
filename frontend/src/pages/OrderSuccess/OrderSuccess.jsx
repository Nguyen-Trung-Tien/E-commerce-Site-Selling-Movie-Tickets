import {
  WrapperContainer,
  WrapperInfo,
  WrapperItemOrder,
  WrapperItemOrderInfo,
  WrapperValue,
} from "./style";
import { useSelector } from "react-redux";
import Loading from "../../component/LoadingComponent/Loading";
import { useLocation } from "react-router-dom";
import { convertPrice } from "../../utils";
import { orderConstant } from "../../constant";
import * as message from "../../component/Message/Message";
import { useEffect } from "react";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
  const { state } = location;

  useEffect(() => {
    if (vnp_ResponseCode === "00") {
      message.success("Thanh toán VNPay thành công!");
    } else {
      message.error("Thanh toán VNPay thất bại!");
    }
  }, [vnp_ResponseCode]);
  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <Loading isPending={false}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h3>Thanh toán thành công</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <label style={{ fontWeight: "bold" }}>Phương thức giao</label>
                  <WrapperValue>
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      {orderConstant.delivery[state]?.delivery}
                    </span>
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <label style={{ fontWeight: "bold" }}>
                    Phương thanh toán
                  </label>
                  <WrapperValue>
                    {orderConstant.payment[state]?.payment}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.product}>
                      <div
                        style={{
                          width: "500px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <img
                          src={order?.image}
                          alt="imag"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            width: "260px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div style={{ fontSize: "13px", color: "#242424" }}></div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span>
                          <span style={{ fontSize: "14px", color: "#242424" }}>
                            Giá tiền: {convertPrice(order?.price)}
                          </span>
                        </span>
                        <span>
                          <span style={{ fontSize: "14px", color: "#242424" }}>
                            Số lượng:
                            {order?.amount}
                          </span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperItemOrderInfo>
              <span>
                <span style={{ fontSize: "20px", color: "red" }}>
                  Tổng tiền:
                  {convertPrice(state?.totalPrice)}
                </span>
              </span>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSuccess;
