import React, { useEffect, useMemo, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Form, Radio } from "antd";
import {
  WrapperLeft,
  WrapperRight,
  WrapperInfo,
  WrapperTotal,
  WrapperRadio,
} from "./style";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import ModalComponent from "../../component/ModalComponent/ModalComponent";
import InputComponent from "../../component/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import * as PaymentService from "../../services/PaymentService ";
import Loading from "../../component/LoadingComponent/Loading";
import * as message from "../../component/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [delivery, setDelivery] = useState();
  const [payment, setPayment] = useState();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);
  const [amount, setAmount] = useState("");
  const [orderInfo, setOrderInfo] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
        city: user?.city,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur?.price * cur?.amount;
    }, 0);
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur?.discount * cur?.amount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 2000000) {
      return 10000;
    } else if (priceMemo === 0) {
      return;
    } else {
      return 30000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo]);

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.phone &&
      user?.address &&
      user?.city &&
      priceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate(
        {
          token: user?.access_token,
          orderItems: order?.orderItemsSelected,
          fullName: user?.name,
          phone: user?.phone,
          address: user?.address,
          city: user?.city,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: deliveryPriceMemo,
          totalPrice: totalPriceMemo,
          user: user?.id,
        },
        {
          onSuccess: () => {
            message.success();
          },
        }
      );
    }
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });

  const {
    data: dataAdd,
    isPending: isPendingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder;

  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      // const arrayOrdered = [];
      // order?.orderItemsSelected?.forEach((element) => {
      //   arrayOrdered.push(element.product);
      // });
      // dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
      message.success("Đặt thành công");
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSelected,
          totalPrice: totalPriceMemo,
        },
      });
    } else if (isError) {
      message.error();
    }
  });

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };
  const handleUpdateInfoUser = () => {
    const { name, phone, address, city } = stateUserDetails;
    if (name && phone && address && city) {
      mutationUpdate.mutate(
        {
          id: user?.id,
          token: user?.access_token,
          ...stateUserDetails,
        },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, phone, address, city }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const addPaypalScrip = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (!window.paypal) {
      addPaypalScrip();
    } else {
      setSdkReady(true);
    }
  }, []);

  useEffect(() => {
    if (!window.vnpay) {
      addVNpay();
    } else {
      setSdkReady(true);
    }
  }, []);

  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate(
      {
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        phone: user?.phone,
        address: user?.address,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: deliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        isPaid: true,
        paidAt: details.update_time,
      },
      {
        onSuccess: () => {
          message.success("Payment successful");
          navigate("/orderSuccess", {
            state: {
              delivery,
              payment,
              orders: order?.orderItemsSelected,
              totalPrice: totalPriceMemo,
            },
          });
        },
        onError: () => {
          message.error("Payment failed");
        },
      }
    );
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
    const vnp_TxnRef = queryParams.get("vnp_TxnRef");

    if (vnp_ResponseCode === "00") {
      setPaymentStatus("Payment successful!");
    } else {
      setPaymentStatus("Payment failed.");
      setErrorMessage(
        `Error Code: ${vnp_ResponseCode}, Transaction Reference: ${vnp_TxnRef}`
      );
    }
  }, []);

  const addVNpay = async () => {
    const amount = totalPriceMemo;
    const paymentData = {
      amount: amount,
      returnUrl: `${process.env.REACT_APP_API_URL}/vnpay_return`,
      ipAddress: "127.0.0.1",
    };
    try {
      const response = await PaymentService.vnpay(paymentData);
      if (response.data.vnpUrl) {
        window.location.href = response.data.vnpUrl;
      } else {
        message.error("Failed to create VNPay payment URL");
      }
    } catch (error) {
      message.error("Error processing payment");
    }
  };

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <Loading isPending={isPendingAddOrder}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h3>Thanh toán</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <label>Chọn phương thanh toán</label>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money">Thanh toán sau </Radio>
                    <Radio value="paypal">Thanh toán bằng Paypal</Radio>
                    <Radio value="vnpay">Thanh toán bằng VNpay</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div>
                    <span>Địa chỉ: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {`${user?.address}, ${user?.city}`}-
                    </span>
                    <span
                      onClick={handleChangeAddress}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Đổi địa chỉ
                    </span>
                  </div>
                </WrapperInfo>
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
                    >
                      {convertPrice(priceMemo)}
                    </span>
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
                      {convertPrice(priceDiscountMemo)}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "500",
                      }}
                    >
                      {convertPrice(totalPriceMemo)}
                    </span>
                    <span style={{ color: "#000", fontSize: "14px" }}>
                      (Đã bao gồm VAT)
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              <div style={{ width: "320px" }}>
                {payment === "paypal" && sdkReady ? (
                  <div>
                    <PayPalButton
                      amount={totalPriceMemo / 30000}
                      onSuccess={onSuccessPaypal}
                      onError={() => {
                        alert("Error in payment!");
                      }}
                    />
                  </div>
                ) : payment === "vnpay" && sdkReady ? (
                  <ButtonComponent
                    amount={totalPriceMemo / 30000}
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      alert("Error in payment!");
                    }}
                    onClick={addVNpay}
                    size={40}
                    textButton={"Thanh toán VNPay"}
                    styleTextButton={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                    styleButton={{
                      width: "320px",
                      background: "#f00",
                      height: "48px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  <ButtonComponent
                    onClick={() => handleAddOrder()}
                    size={40}
                    textButton={"Đặt hàng"}
                    styleTextButton={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                    styleButton={{
                      width: "320px",
                      background: "#f00",
                      height: "48px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </div>
            </WrapperRight>
          </div>
        </div>
        <ModalComponent
          title="Cập nhật thông tin"
          open={isOpenModalUpdateInfo}
          onCancel={handleCancelUpdate}
          onOk={handleUpdateInfoUser}
        >
          <Loading isPending={isPendingAddOrder}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              autoComplete="on"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <InputComponent
                  value={stateUserDetails["name"]}
                  onChange={handleOnChangeDetails}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your  phone!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.phone}
                  onChange={handleOnChangeDetails}
                  name="phone"
                />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.address}
                  onChange={handleOnChangeDetails}
                  name="address"
                />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <InputComponent
                  value={stateUserDetails["city"]}
                  onChange={handleOnChangeDetails}
                  name="city"
                />
              </Form.Item>
            </Form>
          </Loading>
        </ModalComponent>
      </Loading>
    </div>
  );
};

export default PaymentPage;
