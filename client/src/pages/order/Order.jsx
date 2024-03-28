import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getConfirmOrderDataAsync, orders } from "../../redux/productSlice";
import { Link } from "react-router-dom";

const Order = () => {
  const Orders = useSelector(orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConfirmOrderDataAsync());
  }, [dispatch]);

  return (
    <>
      <div className="w-11/12 my-30 mt-28 mx-auto flex flex-col justify-around items-center">
        <h1>All Order</h1>

        <div className="flex w-full items-center justify-center bg-white">
          <div className="p-6 w-full px-0 border">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      S.No
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Product
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Amount
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Date
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Address
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Pay status
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Status
                    </p>
                  </th>
                  {/* <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Controls
                    </p>
                  </th> */}
                </tr>
              </thead>
              {Orders?.length > 0 ? (
                Orders?.map((val, index) => (
                  <OrderCard val={val} key={index} ind={index} />
                ))
              ) : (
                <h1>No data is available</h1>
              )}
            </table>
            {/* <div className="w-full pt-5 px-4 mb-8 mx-auto ">
              <div className="text-sm text-gray-700 py-1">
                Made with
                <Link
                  className="text-gray-700 font-semibold"
                  href="https://www.material-tailwind.com/?ref=tailwindcomponents"
                  target="_blank"
                >
                  Material Tailwind
                </Link>
                by
                <Link
                  href="https://www.creative-tim.com?ref=tailwindcomponents"
                  className="text-gray-700 font-semibold"
                  target="_blank"
                >
                  Creative Tim
                </Link>
                .
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
