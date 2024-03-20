import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addressSchema } from "../../validation";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAsync,
  shippingAdd,
  updateShippingAddressAsync,
  user,
} from "../../redux/userSlice";
import {
  cartData,
  confirmOrderDataAsync,
  deleteCartDataAsync,
  updateCartDataAsync,
} from "../../redux/productSlice";
import { MdDelete } from "react-icons/md";
import { PATHS } from "../../routes/paths";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartApiData = useSelector(cartData);
  const userData = useSelector(user);
  const shippingAddress = useSelector(shippingAdd) || [];

  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  const { handleChange, handleBlur, handleSubmit, errors, values } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      code: "",
      number: "",
      isActive: false,
    },
    validationSchema: addressSchema,
    onSubmit: async (formValues) => {
      // console.log("🚀 ~ onSubmit: ~ formValues:", formValues);
      dispatch(updateShippingAddressAsync([...shippingAddress, formValues]));
    },
  });

  // handleOrder for making a order
  // const handleOrder = async () => {
  //   try {
  //     const response = await FETCH_WRAPPER.post("orderProduct", cartApiData);
  //     console.log(
  //       "🚀 ~ file: Add_To_Cart.jsx:34 ~ handleOrder ~ response:",
  //       !response
  //     );
  //     if (!response) {
  //       return alert(response?.data?.msg);
  //     }
  //     alert(response?.data?.msg);
  //     navigate("/order");
  //   } catch (error) {
  //     console.error("Error during file upload:", error);
  //     // Handle error
  //   }
  // };
  // handleOrder for making a order

  const removeItems = (id) => {
    console.log("🚀 ~ removeItems ~ id:", id);
    dispatch(deleteCartDataAsync(id));
  };

  const handleDelete = (index) => {
    const newShippingAddress = [...shippingAddress];
    newShippingAddress.splice(index, 1);
    dispatch(updateShippingAddressAsync(newShippingAddress));
  };

  const handleSelect = (val) => {
    const newShippingAddress = shippingAddress.map((value) => ({
      ...value,
      isActive: value.address === val.address,
    }));

    dispatch(updateShippingAddressAsync([...newShippingAddress]));
  };

  const handleQuantity = (value, id, cartApiData) => {
    const selectedProduct = cartApiData.filter((val) => val.id === id);
    const newObj = { ...selectedProduct?.[0], customerStock: value };
    console.log("🚀 ~ handleQuantity ~ newObj:", newObj);
    dispatch(updateCartDataAsync(newObj));
  };

  const handleOrder = (orderData) => {
    // console.log("🚀 ~ handleOrder ~ orderData:", orderData);
    dispatch(confirmOrderDataAsync(orderData));
    navigate(PATHS.order);
  };

  return (
    <div className="bg-gray-50">
      {/* <!--
      Mobile menu
  
      Off-canvas menu htmlFor mobile, show/hide based on off-canvas menu state.
    --> */}
      <div className="max-w-7xl mx-auto pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <h2 className="text-lg mb-6 font-medium text-gray-900">
                    Shipping information
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      {errors?.firstName && (
                        <p className="text-red-500 text-sm">
                          {errors?.firstName}
                        </p>
                      )}
                      <div className="mt-1">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          autoComplete="firstName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          className="block w-full py-2 pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      {errors?.lastName && (
                        <p className="text-red-500 text-sm">
                          {errors?.lastName}
                        </p>
                      )}
                      <div className="mt-1">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          autoComplete="lastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                          className="block w-full py-2 pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      {errors?.address && (
                        <p className="text-red-500 text-sm">
                          {errors?.address}
                        </p>
                      )}
                      <div className="mt-1">
                        <textarea
                          rows={5}
                          type="text"
                          cols={10}
                          name="address"
                          id="address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                          autoComplete="address"
                          className="block  pl-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      {errors?.city && (
                        <p className="text-red-500 text-sm">{errors?.city}</p>
                      )}
                      <div className="mt-1">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="city"
                          className="block w-full py-2 pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      {errors?.state && (
                        <p className="text-red-500 text-sm">{errors?.state}</p>
                      )}
                      <div className="mt-1">
                        <input
                          type="text"
                          name="state"
                          value={values.state}
                          id="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="state"
                          className="block w-full py-2 pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal code
                      </label>
                      {errors?.code && (
                        <p className="text-red-500 text-sm">{errors?.code}</p>
                      )}
                      <div className="mt-1">
                        <input
                          type="text"
                          name="code"
                          value={values.code}
                          id="postal-code"
                          autoComplete="postal-code"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full py-2 pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Number
                      </label>
                      {errors?.number && (
                        <p className="text-red-500 text-sm">{errors?.number}</p>
                      )}
                      <div className="mt-1">
                        <input
                          type="text"
                          name="number"
                          id="number"
                          onChange={handleChange}
                          value={values.number}
                          onBlur={handleBlur}
                          autoComplete="number"
                          className="block w-full py-2 pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="w-full pt-8 flex justify-between">
                        <button className="p-2 px-6 shadow-md" type="reset">
                          Reset
                        </button>
                        <button className="p-2 px-6 shadow-md" type="submit">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              {/* delivery address */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <fieldset>
                  <legend className="text-lg font-medium text-gray-900">
                    Delivery Address
                  </legend>

                  <div className="mt-4  grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {shippingAddress?.map((val, index) => {
                      return (
                        <div
                          key={index}
                          className="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                        >
                          <div className="flex-1 flex">
                            <div key={index} className="flex flex-col">
                              <span
                                id="delivery-method-0-label"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {val?.name}
                              </span>
                              <span
                                id="delivery-method-0-description-0"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {val?.address}
                              </span>
                              <span
                                id="delivery-method-0-description-1"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {val?.code}
                              </span>
                            </div>
                          </div>
                          <button
                            className="h-5 w-5"
                            onClick={() => handleSelect(val)}
                          >
                            <svg
                              className={`${
                                val?.isActive && "text-indigo-600"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            className="h-5 w-5"
                            onClick={() => handleDelete(index)}
                          >
                            <MdDelete className="h-5 w-5 text-indigo-600 ml-2" />
                          </button>
                          <div
                            className="absolute -inset-px rounded-lg border-2 pointer-events-none"
                            aria-hidden="true"
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              {/* <!-- Payment --> */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    <div className="flex items-center">
                      <input
                        id="cash"
                        name="payment-type"
                        type="radio"
                        checked
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor="cash"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            {/* <!-- Order summary --> */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul className="divide-y divide-gray-200">
                  {cartApiData?.map((val, index) => (
                    <li className="flex py-6 px-4 sm:px-6" key={index}>
                      <div className="flex-shrink-0">
                        <img
                          src={val?.images?.[0]}
                          alt="Front of men&#039;s Basic Tee in black."
                          className="w-20 rounded-md"
                        />
                      </div>

                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <Link
                                href="#"
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {val?.name}
                              </Link>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {val?.brand}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {val?.category}
                            </p>
                          </div>

                          <div className="ml-4 flex-shrink-0 flow-root">
                            <button
                              type="button"
                              className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                              onClick={() => removeItems(val?.id)}
                            >
                              <span className="sr-only">Remove</span>
                              {/* <!-- Heroicon name: solid/trash --> */}
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 pt-2 flex items-end justify-between">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            $32.00
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <select
                              id="quantity"
                              name="quantity"
                              className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              onChange={(e) =>
                                handleQuantity(
                                  e.target.value,
                                  val?.id,
                                  cartApiData
                                )
                              }
                              defaultValue={val?.customerStock}
                            >
                              {Array.from(new Array(8)).map((val, index) => (
                                <option value={index + 1}>{index + 1}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}

                  {/* <!-- More products... --> */}
                </ul>
                <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      $64.00
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      $75.52
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    onClick={() =>
                      handleOrder({
                        ...userData,
                        orders: [...cartApiData],
                        paymentType: "cashOnDelivery",
                      })
                    }
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
