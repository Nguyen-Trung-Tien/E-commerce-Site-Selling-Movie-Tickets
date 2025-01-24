import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import * as OderService from "../../services/OrderService";
import Loading from "../../component/LoadingComponent/Loading";
import { useSelector } from "react-redux";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const fetchMyOrder = async () => {
    const res = await OderService.getOrderByUserId(
      user?.id,
      user?.access_token
    );
    return res.data;
  };
  const queryOrder = useQuery(
    { queryKey: ["order"], queryFn: fetchMyOrder },
    {
      enabled: user?.id && user.access_token,
    }
  );
  const { isPending, data: order } = queryOrder;
  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      My Order
    </div>
  );
};

export default MyOrderPage;
