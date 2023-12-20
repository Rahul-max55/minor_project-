import React, { useEffect, useState } from "react";
import FETCH_WRAPPER from "../../Api";
import AdminOrderCard from "./AdminOrderCard";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    (async () => {
      try {
        const response = await FETCH_WRAPPER.get("getOrderProduct");
        if (!response) {
          alert(response?.data?.data?.msg);
        }
        setOrders(response?.data?.data);
      } catch (error) {
        console.log("🚀 ~ file: AdminCard.jsx:12 ~ error:", error);
      }
    })();
  }, []);

      // console.log("🚀 ~ file: AdminOrder.jsx:7 ~ AdminOrder ~ orders:", orders)

  return (
    <>
      {orders &&
        orders?.[0]?.products?.map((val, index) => <AdminOrderCard key={index} val={val} userId={orders?.[0]?.userId} />)}
    </>
  );
};

export default AdminOrder;
