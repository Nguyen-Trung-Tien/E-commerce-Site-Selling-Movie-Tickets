import React from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../component/InputForm/InputForm";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imageLogo from "../../assets/images/sign-in.png";

const SignInPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          backgroundColor: "#fff",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
          />

          <InputForm placeholder="Mật khẩu" />
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: "rgb(255,57, 69)",
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              margin: "26px 0 10px ",
            }}
            textButton={"Đăng nhập"}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          />
          <p>
            <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <WrapperTextLight>Tạo tài khoản </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="image-logo"
            height={"203px"}
            width={"203px"}
          />
          <h4>Mua vé ngay</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
