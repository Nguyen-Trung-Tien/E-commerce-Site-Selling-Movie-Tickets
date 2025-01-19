import React, { useEffect, useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../component/InputForm/InputForm";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imageLogo from "../../assets/images/sign-in.png";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../component/LoadingComponent/Loading";
import * as UserService from "../../services/UserService";
import * as message from "../../component/Message/Message";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success("Đăng ký thành công");
      handleNavigateSignIn();
    } else if (isError) {
      message.error("Đăng ký thất bại");
    }
  }, [isSuccess, isError]);

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
  };

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
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <InputForm
              type={isShowPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={handleOnChangePassword}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {isShowPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <InputForm
              type={isShowConfirmPassword ? "text" : "password"}
              placeholder="confirm password"
              value={confirmPassword}
              onChange={handleOnChangeConfirmPassword}
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {isShowConfirmPassword ? (
                <EyeInvisibleOutlined />
              ) : (
                <EyeOutlined />
              )}
            </span>
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: "rgb(255,57, 69)",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "26px 0 10px ",
              }}
              textButton={"Đăng ký"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </Loading>
          <p>
            Bạn đã có tài khoản?
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
            </WrapperTextLight>
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

export default SignUpPage;
