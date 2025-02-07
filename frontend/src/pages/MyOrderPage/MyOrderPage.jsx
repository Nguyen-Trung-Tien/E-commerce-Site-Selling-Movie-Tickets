import { useQuery } from "@tanstack/react-query";
import React from "react";
import * as OrderService from "../../services/OrderService"; // Kiểm tra lại tên file
import Loading from "../../component/LoadingComponent/Loading";
import { useSelector } from "react-redux";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(
      user?.id,
      user?.access_token
    );
    return res.data;
  };

  const { isPending, data: order } = useQuery({
    queryKey: ["order"],
    queryFn: fetchMyOrder,
    enabled: !!(user?.id && user?.access_token), // Đảm bảo là boolean
  });

  if (isPending) return <Loading />;

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <h2>My Order</h2>
      {order?.length > 0 ? (
        <ul>
          {order.map((o) => (
            <li key={o.id}>{o.name}</li>
          ))}
        </ul>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default MyOrderPage;
