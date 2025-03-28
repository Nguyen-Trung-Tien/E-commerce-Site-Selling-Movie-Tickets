import NavBarComponent from "../../component/NavBarComponent/NavBarComponent";
import CardComponent from "../../component/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "../TypeProductPage/style";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import Loading from "../../component/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [pending, setPending] = useState(0);
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [paginate, setPaginate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });

  const fetchProductType = async (type, page, limit) => {
    setPending(true);
    const res = await ProductService.getProductType(type);
    if (res?.status === "OK") {
      setPending(false);
      setProducts(res?.data);
      setPaginate({ ...paginate, total: res?.data });
    } else {
      setPending(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state, paginate.page, paginate.limit);
    }
  }, [state, paginate.page, paginate.limit]);

  const onChange = (current, pageSize) => {
    setPaginate({ ...paginate, page: current - 1, limit: pageSize });
  };
  return (
    <Loading isPending={pending}>
      <div
        style={{
          width: "100%",
          background: "#efefef",
          height: "calc(100vh - 64px)",
        }}
      >
        <div style={{ width: "1270px", margin: "0 auto", height: "100%" }}>
          <Row
            style={{
              display: "flex",
              flexWrap: "nowrap",
              paddingTop: "10px",
              height: "calc(100vh - 64px)",
            }}
          >
            <WrapperNavbar span={4}>
              <NavBarComponent />
            </WrapperNavbar>
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <WrapperProducts>
                {products
                  ?.filter(
                    (pro) =>
                      searchDebounce === "" ||
                      pro?.name
                        ?.toLowerCase()
                        ?.includes(searchDebounce?.toLowerCase())
                  )
                  .map((product) => (
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
                      id={product._id}
                    />
                  ))}
              </WrapperProducts>

              <Pagination
                defaultCurrent={paginate?.page + 1}
                total={paginate?.total}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
