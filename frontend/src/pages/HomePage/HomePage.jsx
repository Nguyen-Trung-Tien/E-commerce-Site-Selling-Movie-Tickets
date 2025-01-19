import React, { use, useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";
import Loading from "../../component/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const arr = [
    "Phim hành động",
    "Phim hoạt hình",
    "Phim Drama",
    "Phim điện ảnh",
  ];

  const searchProduct = useSelector((state) => state?.product?.search);
  const [stateProducts, setStateProducts] = useState([]);
  const searchDebounce = useDebounce(searchProduct, 2000);
  const [Pending, setPending] = useState(false);
  const refSearch = useRef();
  const fetchProductsAll = async (search) => {
    // if (search.length > 0) {
    // }
    const res = await ProductService.getAllProduct(search);
    if (search.length > 0 || refSearch.current) {
      setStateProducts(res?.data);
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (refSearch.current) {
      setPending(true);
      fetchProductsAll(searchDebounce);
    }
    refSearch.current = true;
    setPending(false);
  }, [searchDebounce]);

  const { isPending, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsAll,
    retry: 3,
    retryDelay: 1000,
  });
  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProducts(products?.data);
    }
  }, [products]);

  return (
    <Loading isPending={isPending || Pending}>
      <div style={{ width: "1270px", background: "#efefef", margin: "0 auto" }}>
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
      <div className="body" style={{ width: "100%", background: "#efefef" }}>
        <div
          id="container"
          style={{ height: "1000px", width: "1270px", margin: "0 auto" }}
        >
          <WrapperProducts>
            {stateProducts?.map((product) => {
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
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
