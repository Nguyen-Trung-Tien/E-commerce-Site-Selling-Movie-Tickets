import React from "react";
import TypeProduct from "../../component/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./style";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import slider4 from "../../assets/images/slider4.jpg";

const HomePage = () => {
  const arr = [
    "Phim hành động",
    "Phim hoạt hình",
    "Phim Drama",
    "Phim điện ảnh",
  ];
  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
        <div
          id="container"
          style={{ backgroundColor: "#efefef", padding: "0 120px" }}
        >
          <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
