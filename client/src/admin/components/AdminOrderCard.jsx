import React from "react";
import ProductOne from "../images/product/product-01.png";
import ProductTwo from "../images/product/product-02.png";
import ProductThree from "../images/product/product-03.png";
import ProductFour from "../images/product/product-04.png";
import FETCH_WRAPPER from "../../Api";
import useFormattedDate from "../hooks/useFormattedDate";
import { useFormik } from "formik";

const AdminOrderCard = ({ val, userId }) => {
  const { image, name, date, price, status } = val;
  const orderStatusVal = status[0];
  const [formattedDate] = useFormattedDate(date);

  // form data using

  const initialValues = {
    orderStatus: "",
  };

  // Use useFormik hook
  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: async (values) => {
    

      try {
        const data = await FETCH_WRAPPER.put("updateProduct", {
          values,
        productId:val?._id,
          userId,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: AdminOrderCard.jsx:29 ~ onSubmit: ~ error:",
          error
        );
      }
    },
  });
  // End form data using

  return (
    <div className="min-h-[350px] p-5 mx-10 my-5 rounded-lg flex flex-col border-primary border-2 justify-around items-center">
      {/* details */}
      <div className="h-3/6 flex px-5 items-center space-x-5 justify-center">
        <div>
          <img className="w-72" src={image?.[0]?.url} alt="random" />
        </div>
        <div>
          <h2 className="text-xl font-medium"> {name}</h2>
          <p>${price}</p>
          <p>This durable and portable insulated tumbler will keep your</p>
        </div>
        <div className="w-72">
          <h2 className="text-lg font-medium pb-1"> Delivery address</h2>
          <p> {JSON.parse(localStorage.getItem("user")).address}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium pb-1"> Shipping updates</h2>
          <p> {JSON.parse(localStorage.getItem("user")).email}</p>
          <p> {JSON.parse(localStorage.getItem("user")).number}</p>
        </div>
      </div>
      {/* details Ends */}
      {/* progress */}
      <div className="bg-stroke p-4 rounded-lg flex-col justify-evenly items-center w-10/12 mx-auto">
        <div className="m-2">{formattedDate}</div>
        {/* <!-- Progress Bar --> */}
        <div class="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-md">
          {/*checkbox for status update  */}
          <form
            onSubmit={handleSubmit}
            class="flex w-full justify-around items-center"
          >
            <div class="flex relative items-center me-4">
              {orderStatusVal === "ordered" && (
                <div class="w-4 h-4 absolute bg-primary rounded-full animate-ping"></div>
              )}
              <input
                checked={values?.orderStatus === "ordered"}
                id={`ordered${val?._id}`}
                type="radio"
                value="ordered"
                name="orderStatus"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                for={`ordered${val?._id}`}
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Order
              </label>
            </div>
            <div class="flex relative items-center me-4">
              {orderStatusVal === "shipped" && (
                <div class="w-4 h-4 absolute bg-primary rounded-full animate-ping"></div>
              )}
              <input
                checked={values?.orderStatus === "shipped"}
                id={`shipped${val?._id}`}
                type="radio"
                value="shipped"
                name="orderStatus"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                for={`shipped${val?._id}`}
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Shipped
              </label>
            </div>
            <div class="flex relative items-center me-4">
              {orderStatusVal === "delivered" && (
                <div class="w-4 h-4 absolute bg-primary rounded-full animate-ping"></div>
              )}
              <input
                checked={values?.orderStatus === "delivered"}
                id={`delivered${val?._id}`}
                type="radio"
                value="delivered"
                name="orderStatus"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                for={`delivered${val?._id}`}
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Delivered
              </label>
            </div>
            <button
              type="submit"
              class="w-1/5 flex justify-center items-center"
            >
              <div class="flex bg-primary px-6 rounded-xl py-1 text-white items-center">
                <div class="text-sm font-medium text-gray-700">Save</div>
              </div>
            </button>
          </form>
          {/*checkbox for status update  */}
        </div>
      </div>
      {/* Progress Ends */}
    </div>
  );
};

export default AdminOrderCard;
