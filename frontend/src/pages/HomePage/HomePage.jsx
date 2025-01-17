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
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";

const HomePage = () => {
  const arr = [
    "Phim hành động",
    "Phim hoạt hình",
    "Phim Drama",
    "Phim điện ảnh",
  ];

  const fetchProductsAll = async () => {
    const res = await ProductService.getAllProduct();
    console.log("Fetched products:", res);
    return res;
  };

  const { isPending, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsAll,
    retry: 3,
    retryDelay: 1000,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ padding: "0 120px", background: "#efefef" }}>
        <WrapperTypeProduct>
          {arr.map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </WrapperTypeProduct>
      </div>
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
        {products?.data?.map((product) => {
          return (
            <CardComponent
              key={product._id}
              description={product.description}
              image={product.image}
              name={product.name}
              price={product.price}
              rating={product.rating}
              type={product.type}
              discount={product.discount}
              seller={product.seller}
              countInStock={product.countInStock}
            />
          );
        })}
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
    </>
  );
};

export default HomePage;
