import React, { useEffect, useState } from "react";
import FETCH_WRAPPER from "../../Api";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getConfirmOrderDataAsync, orders } from "../../redux/productSlice";

const Order = () => {
  const Orders = useSelector(orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConfirmOrderDataAsync());
  }, []);

  return (
    <>
      <div className="w-11/12 min-h-80 my-30 mx-auto flex flex-col justify-around items-center">
        <h1>All Order</h1>
        {Orders?.length > 0 ? (
          Orders.map((val) => <OrderCard val={val} />)
        ) : (
          <h1>No data is available</h1>
        )}
      </div>
    </>
  );
};

export default Order;
