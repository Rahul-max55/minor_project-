import React from "react";
import ProductOne from "../images/product/product-01.png";
import ProductTwo from "../images/product/product-02.png";
import ProductThree from "../images/product/product-03.png";
import ProductFour from "../images/product/product-04.png";
import FETCH_WRAPPER from "../../Api";
import useFormattedDate from "../hooks/useFormattedDate";

const AdminOrderCard = ({ val }) => {
  console.log("🚀 ~ file: AdminOrderCard.jsx:10 ~ AdminOrderCard ~ val:", val)
  const { image, name, date, price , status } = val;
  const orderStatus = status[0];
  console.log("🚀 ~ file: AdminOrderCard.jsx:12 ~ AdminOrderCard ~ status:", orderStatus)
  const [formattedDate] = useFormattedDate(date);

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
          <form class="flex w-full justify-around items-center">
            <div class="flex items-center me-4">
              <input
            //   orderStatus && checked
                id="ordered"
                type="radio"
                value="ordered"
                name="order-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                for="ordered"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Order
              </label>
            </div>
            <div class="flex items-center me-4">
              <input
                id="shipped"
                type="radio"
                value="Shipped"
                name="order-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                for="shipped"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                shipped
              </label>
            </div>
            <div class="flex items-center me-4">
              <input
                id="delivered"
                type="radio"
                value="Delivered"
                name="order-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                for="delivered"
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
