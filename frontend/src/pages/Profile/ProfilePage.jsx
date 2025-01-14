import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
} from "./style";
import InputForm from "../../component/InputForm/InputForm";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../component/LoadingComponent/Loading";
import * as Message from "../../component/Message/Message";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHook((id, data) =>
    UserService.updateUser(id, data)
  );
  const { data, isPending, isSuccess, isError } = mutation;
  const dispatch = useDispatch();
  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      Message.success("Cập nhật thành công");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      Message.error("Cập nhật thất bại");
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(UserService.updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnChangeAvatar = (value) => {
    setAvatar(value);
  };

  const handleUpdate = () => {
    mutation.mutate(user.id, {
      email,
      name,
      phone,
      address,
      avatar,
    });
  };
  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isLoading={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <InputForm
              id="avatar"
              style={{ width: "300px" }}
              value={avatar}
              onChange={handleOnChangeAvatar}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textButton={"Cập nhật"}
              styleTextButton={{
                color: "rgb(26,148,255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm
              id="name"
              style={{ width: "300px" }}
              value={name}
              onChange={handleOnChangeName}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textButton={"Cập nhật"}
              styleTextButton={{
                color: "rgb(26,148,255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm
              id="email"
              style={{ width: "300px" }}
              value={email}
              onChange={handleOnChangeEmail}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textButton={"Cập nhật"}
              styleTextButton={{
                color: "rgb(26,148,255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm
              id="phone"
              style={{ width: "300px" }}
              value={phone}
              onChange={handleOnChangePhone}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textButton={"Cập nhật"}
              styleTextButton={{
                color: "rgb(26,148,255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputForm
              id="address"
              style={{ width: "300px" }}
              value={address}
              onChange={handleOnChangeAddress}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textButton={"Cập nhật"}
              styleTextButton={{
                color: "rgb(26,148,255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
