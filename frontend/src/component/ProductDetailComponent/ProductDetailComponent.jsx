import { Col, Row, Image } from "antd";
import React from "react";
import imageProduct from "../../assets/images/test.jpg";
import test2Image from "../../assets/ImageSmall/test2.webp";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
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
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
const ProductDetailComponent = () => {
  const onChange = (value) => {
  };
  return (
    <Row style={{ padding: "10px", background: "#fff" }}>
      <Col
        span={10}
        style={{ borderRight: "1px solid #e5e5e5", paddingRight: "16px" }}
      >
        <Image src={imageProduct} alt="image product" preview={false} />
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
          {" "}
          Phim 404- CHẠY NGAY ĐI
        </WrapperStyleNameProduct>
        <div>
          <StarFilled
            style={{ fontSize: "20px", color: "rgb(253, 216, 54)" }}
          />
          <StarFilled
            style={{ fontSize: "20px", color: "rgb(253, 216, 54)" }}
          />
          <StarFilled
            style={{ fontSize: "20px", color: "rgb(253, 216, 54)" }}
          />
          <WrapperStyleTextSell>| Đã bán 5000+ vé</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>90.000VND</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressPriceTextProduct>
          <span>Địa chỉ </span>
          <span className="address"> Galaxy cinema quận Bình Tân Tp. HCM </span>
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
            <button style={{ border: "none", background: "transparent" }}>
              <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>

            <WrapperInputNumber
              defaultValue={3}
              onChange={onChange}
              size="small"
            />
            <button style={{ border: "none", background: "transparent" }}>
              <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <ButtonComponent
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
  );
};

export default ProductDetailComponent;
