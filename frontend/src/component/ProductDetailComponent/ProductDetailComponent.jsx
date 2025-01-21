import { Col, Row, Image, Rate } from "antd";
import React, { useState } from "react";
import test2Image from "../../assets/ImageSmall/test2.webp";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import {
  WrapperAddressPriceTextProduct,
  WrapperColImage,
  WrapperImageSmall,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const ProductDetailComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService?.getDetailsProduct(id);
      return res.data;
    }
  };

  const { isPending, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });

  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct((prev) => prev + 1);
    } else {
      setNumProduct((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else if (productDetails && numProduct) {
      dispatch(
        addOrderProduct({
          orderItems: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
            countInStock: productDetails?.countInStock,
          },
        })
      );
    }
  };
  return (
    <Loading isPending={isPending}>
      <Row style={{ padding: "10px", background: "#fff" }}>
        <Col
          span={10}
          style={{ borderRight: "1px solid #e5e5e5", paddingRight: "16px" }}
        >
          <Image
            src={productDetails?.image}
            alt="image product"
            preview={false}
          />
          <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            <WrapperColImage span={4}>
              <WrapperImageSmall
                src={test2Image}
                alt="image product"
                preview={false}
              />
            </WrapperColImage>
            <WrapperColImage span={4}>
              <WrapperImageSmall
                src={test2Image}
                alt="image product"
                preview={false}
              />
            </WrapperColImage>
            <WrapperColImage span={4}>
              <WrapperImageSmall
                src={test2Image}
                alt="image product"
                preview={false}
              />
            </WrapperColImage>
            <WrapperColImage span={4}>
              <WrapperImageSmall
                src={test2Image}
                alt="image product"
                preview={false}
              />
            </WrapperColImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: "16px" }}>
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <div>
            <Rate
              allowHalf
              defaultValue={productDetails?.rating}
              value={productDetails?.rating}
            />
            <WrapperStyleTextSell>| Đã bán 5000+ vé</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {productDetails?.price}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressPriceTextProduct>
            <span>Địa chỉ </span>
            <span className={user?.address}>
              Galaxy cinema quận Bình Tân Tp. HCM{" "}
            </span>
            <span className="change-address"> -Đổi địa chỉ </span>
          </WrapperAddressPriceTextProduct>
          <div
            style={{
              margin: "10px 0 20px",
              padding: "10px 0",
              borderBottom: "1px solid #e5e5e5",
              borderTop: "1px solid #e5e5e5",
            }}
          >
            <div style={{ marginBottom: "16px" }}>Số lượng</div>
            <WrapperQualityProduct>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCount("decrease")}
              >
                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>

              <WrapperInputNumber
                defaultValue={1}
                value={numProduct}
                onChange={onChange}
                size="small"
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCount("increase")}
              >
                <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <ButtonComponent
              onClick={handleAddOrderProduct}
              size={40}
              styleButton={{
                background: "rgb(255,57, 69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={"Chọn mua"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
            <ButtonComponent
              size={40}
              styleButton={{
                background: "#fff",
                height: "48px",
                width: "220px",
                border: "1px solid rgb(13,92,182)",
                borderRadius: "4px",
              }}
              textButton={"Mua trả sau"}
              styleTextButton={{
                color: "rgb(13,92,182)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </div>
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetailComponent;
