import React, { useEffect, useState } from "react";
import FETCH_WRAPPER from "../Api";
import OrderCard from "./OrderCard";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await FETCH_WRAPPER.get("getOrderProduct");
      if (!response?.data?.status) {
        return alert(response?.data?.msg);
      }
      setOrderData(response?.data?.data?.[0]?.products);
    } catch (error) {
      console.error("Error during file upload:", error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div className="w-11/12 min-h-80 my-30 mx-auto flex flex-col justify-around items-center">
        <h1>All Order</h1>
        {
        (orderData?.length > 0) ? orderData.map((val) => <OrderCard val={val} />) : <h1>No data is available</h1>
      }
      </div>
    </>
  );
};

export default Order;
