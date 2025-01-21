import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetailComponent from "../../component/ProductDetailComponent/ProductDetailComponent";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh", width: "100%", background: "#efefef" }}>
      <div style={{ width: "1270px", height: "100px", margin: "0 auto" }}>
        <h5>
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/")}
          >
            Trang chủ - Chi tiết sản phẩm
          </span>
        </h5>
        <ProductDetailComponent idProduct={id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
