import React from "react";
import useFormattedDate from "./../../admin/hooks/useFormattedDate";
import { deleteConfirmOrderDataAsync } from "../../redux/productSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const OrderCard = ({ val, ind }) => {
  const { email, shippingAddress, updatedAt, orders, paymentType } = val;
  const newShippingAddress = shippingAddress.filter((val) => val.isActive);
  const dispatch = useDispatch();

  const { address, number } = newShippingAddress[0];

  const { name, description, rating, brand, price, images, orderStatus } =
    orders[0];

  const [formattedDate] = useFormattedDate(updatedAt);

  const handleDelete = (id) => {
    dispatch(deleteConfirmOrderDataAsync(id));
  };

  return (
    <>
      <tbody>
        <tr>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="flex items-center gap-3">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900">
                {ind + 1}
              </p>
            </div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="flex items-center gap-3">
              <img
                src={images[0]}
                alt="Spotify"
                className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
              />
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                {name}
              </p>
            </div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              Rs.{price}
            </p>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {formattedDate}
            </p>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {address}
            </p>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="w-max">
              <div
                className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-md"
                style={{ opacity: 1 }}
              >
                <span className="">cash</span>
              </div>
            </div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="w-max">
              <div
                className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-md"
                style={{ opacity: 1 }}
              >
                <span className="">{orderStatus}</span>
              </div>
            </div>
          </td>
          {/* <td className="p-4 border-b border-blue-gray-50">
            <button
              className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
              type="button"
            >
              <span className="absolute top-1/2 left-1/2 transform flex text-xl -translate-y-1/2 -translate-x-1/2">
                <MdDelete />
              </span>
            </button>
            <button
              className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
              type="button"
            >
              <span className="absolute top-1/2 left-1/2 transform flex text-xl -translate-y-1/2 -translate-x-1/2">
                <MdDelete />
              </span>
            </button>
            <button
              className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
              type="button"
            >
              <span className="absolute top-1/2 left-1/2 transform flex text-xl -translate-y-1/2 -translate-x-1/2">
                <MdDelete />
              </span>
            </button>
          </td> */}
        </tr>
      </tbody>
    </>
  );
};

export default OrderCard;
