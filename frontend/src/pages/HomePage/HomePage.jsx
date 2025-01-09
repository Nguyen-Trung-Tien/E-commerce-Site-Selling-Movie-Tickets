import React from "react";
import TypeProduct from "../../component/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import slider4 from "../../assets/images/slider4.jpg";
import CardComponent from "../../component/CardComponent/CardComponent";

const HomePage = () => {
  const arr = [
    "Phim hành động",
    "Phim hoạt hình",
    "Phim Drama",
    "Phim điện ảnh",
  ];
  return (
    <>
      <div style={{ padding: "0 120px", background: "#efefef" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
        <div
          id="container"
          style={{
            padding: "0 0px",
            width: "100%",
          }}
        >
          <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
        </div>
        <WrapperProducts>
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </WrapperProducts>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <WrapperButtonMore
            textButton="Xem thêm"
            type="outline"
            styleButton={{
              border: "1px solid rgb(11, 116, 229)",
              color: "rgb(11, 116, 229)",
              width: "240px",
              height: "38px",
              borderRadius: "4px",
            }}
            styleTextButton={{ fontWeight: "500", fontSize: "14px" }}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
