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
  const searchDebounce = useDebounce(searchProduct, 2000);
  const [Pending, setPending] = useState(false);
  const [limit, setLimit] = useState(5);
  // const [page, setPage] = useState(6);

  const fetchProductsAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const {
    isPending,
    data: products,
    isPreviousData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductsAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

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
              textButton={isPreviousData ? "Load more " : "Xem thêm"}
              type="outline"
              styleButton={{
                border: "1px solid rgb(11, 116, 229)",
                color: `${
                  products?.total === products?.data?.length
                    ? "#ccc"
                    : "  rgb(11, 116, 229)"
                }`,
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              size="large"
              styleTextButton={{
                fontWeight: "500",
                color: (products?.total === products?.data?.length) & "#fff",
              }}
              onClick={() => setLimit((prev) => prev + 8)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
