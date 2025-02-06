import React, { useEffect, useMemo, useState } from "react";
import { Checkbox, Form } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  WrapperListOrder,
  WrapperStyleHeader,
  WrapperLeft,
  WrapperRight,
  WrapperInfo,
  WrapperTotal,
  WrapperItemOrder,
  WrapperCountOrder,
  WrapperStyleHeaderDelivery,
} from "./style";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import { WrapperInputNumber } from "../../component/ProductDetailComponent/style";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import ModalComponent from "../../component/ModalComponent/ModalComponent";
import InputComponent from "../../component/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as UserService from "../../services/UserService";
import Loading from "../../component/LoadingComponent/Loading";
import * as message from "../../component/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import StepComponent from "../../component/StepComponent/StepComponent";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleChangeCount = (type, idProduct) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleOnChangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

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
      return total + dispatch?.price * cur?.amount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
    dispatch(removeAllOrderProduct({ listChecked }));
  };

  const handleAddCart = () => {
    if (!order?.orderItemsSelected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!user?.phone || !user?.address || !user?.name || !user?.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isPending, data } = mutationUpdate;

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
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

  const itemsDelivery = [
    {
      title: "0VND",
      description: "",
    },
    {
      title: "10.000VND",
      description: "",
      subTitle: "",
    },
    {
      title: "20.000VND",
      description: "",
    },
  ];

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeaderDelivery>
              <StepComponent items={itemsDelivery} />
            </WrapperStyleHeaderDelivery>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox
                  onChange={handleOnChangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                />
                <span style={{ marginLeft: "12px" }}>
                  Tất cả ({order?.orderItems?.length}) sản phẩm
                </span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  paddingRight: "20px",
                }}
              >
                <span style={{ width: "120px", textAlign: "center" }}>
                  Đơn giá
                </span>
                <span style={{ width: "120px", textAlign: "center" }}>
                  Số lượng
                </span>
                <span style={{ width: "120px", textAlign: "center" }}>
                  Thành tiền
                </span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveAllOrder(order?.product)}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.product}>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Checkbox
                        onChange={onChange}
                        value={order?.product}
                        checked={listChecked.includes(order?.product)}
                      ></Checkbox>
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
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "14px", color: "#242424" }}>
                          {convertPrice(order?.price)}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        <button
                          style={{ border: "none", background: "transparent" }}
                          onClick={() =>
                            handleChangeCount("decrease", order?.product)
                          }
                        >
                          <MinusOutlined
                            style={{ fontSize: "12px", color: "#000" }}
                          />
                        </button>
                        <WrapperInputNumber
                          defaultValue={order?.amount}
                          value={order?.amount}
                          size="small"
                          controls={false}
                        />
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount("increase", order?.product)
                          }
                        >
                          <PlusOutlined style={{ fontSize: "12px" }} />
                        </button>
                      </WrapperCountOrder>
                      <span
                        style={{
                          width: "120px",
                          textAlign: "center",
                          color: "rgb(254, 56, 52)",
                          fontWeight: "500",
                        }}
                      >
                        {convertPrice(order?.price * order?.amount)}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(order?.product)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
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
                    {`${priceDiscountMemo}%`}
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
                    {convertPrice(priceMemo)}
                  </span>
                  <span style={{ color: "#000", fontSize: "14px" }}>
                    (Đã bao gồm VAT)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddCart()}
              size={40}
              textButton={"Mua hàng"}
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
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInfoUser}
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form} // Add this line
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
              rules={[{ required: true, message: "Please input your  phone!" }]}
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
    </div>
  );
};

export default OrderPage;
