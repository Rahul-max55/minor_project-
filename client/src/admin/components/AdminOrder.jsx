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
        setOrders(response?.data?.data?.[0]?.products);
      } catch (error) {
        console.log("🚀 ~ file: AdminCard.jsx:12 ~ error:", error);
      }
    })();
  }, []);


  return (
    <>
      {orders &&
        orders?.map((val, index) => <AdminOrderCard key={index} val={val} />)}
    </>
  );
};

export default AdminOrder;
