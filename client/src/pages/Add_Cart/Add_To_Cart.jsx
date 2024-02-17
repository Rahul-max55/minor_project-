import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Add_To_Cart.css";
import { MdRemoveCircle } from "react-icons/md";
import FETCH_WRAPPER from "../../Api";
// import { CartCreateContext } from "./context/CartCreateContext";
import {useSelector } from "react-redux";
import { cartData } from "../../redux/productSlice";

const Add_To_Cart = () => {
  // const context = useContext(CartCreateContext);
  // const { cartData, cartApiData } = context;
  const navigate = useNavigate();
  const cartApiData = useSelector(cartData);
  console.log("🚀 ~ cartApiData:", cartApiData)

  useEffect(() => {
    // cartData();

  }, []);

  const grandTotal = cartApiData?.reduce((total, value, index) => {
    console.log(value?.stock);
    return (total = total + value?.customerStock * value.price);
  }, 0);

  const removeItems = async (_id) => {
    try {
      await FETCH_WRAPPER.delete(`deleteProduct/${_id}`);
      cartData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = async () => {
    try {
      const response = await FETCH_WRAPPER.post("orderProduct", cartApiData);
      console.log(
        "🚀 ~ file: Add_To_Cart.jsx:34 ~ handleOrder ~ response:",
        !response
      );
      if (!response) {
        return alert(response?.data?.msg);
      }
      alert(response?.data?.msg);
      navigate("/order");
    } catch (error) {
      console.error("Error during file upload:", error);
      // Handle error
    }
  };

  // console.log(cartApiData);

  return (
    <>
      <div className="cart_containe">
        <div className="cart_heading">
          <h4>ITEM</h4>
          <h4>PRICE</h4>
          <h4>QUANTITY</h4>
          <h4>SUBTOTAL</h4>
          <h4>REMOVE</h4>
        </div>

        {cartApiData?.length > 0 ? (
          cartApiData?.map((value) => {
            // console.log(value.Product_total_amount);
            return (
              <div className="cart_All_items " key={value.id}>
                <div className="cart_items">
                  <img src={value?.images?.[0]} alt="images" />
                  <div className="cart_items_details">
                    <p>{value.name}</p>
                    <p className="colorSection">
                      color:
                      <span
                        className="Single_color cart_color_pro"
                        style={{
                          backgroundColor: value.colors,
                          opacity: "1",
                        }}
                      ></span>
                    </p>
                  </div>
                </div>
                <div className="cart_price">
                  <h4>{value.price}</h4>
                </div>
                <div className="cart_price">
                  {/* <AiFillMinusSquare onClick={() => increDecre(-1, value.id)} /> */}
                  <p>{value?.customerStock}</p>
                  {/* <AiFillPlusSquare onClick={() => increDecre(+1, value.id)} /> */}
                </div>
                <div className="cart_price">
                  <h4>{value?.customerStock * value?.price}</h4>
                </div>
                <div className="cart_price">
                  <MdRemoveCircle
                    onClick={() => {
                      removeItems(value?._id);
                    }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="Cart_msg">No Products Added in Card</div>
        )}
      </div>
      <div className="two_buttons">
        <NavLink to="/" className="common_css">
          CONTINUE SHOPPING
        </NavLink>
        <button className="clear_cart common_css" onClick={handleOrder}>
          Buy Now
        </button>
      </div>

      <div className="cart_total">
        <p>
          Subtotal: <span> {grandTotal}</span>
        </p>
        <p>
          Shipping Fee: <span> 0</span>
        </p>
        <hr />
        <p>
          Order Total:<span> {grandTotal + 0}</span>
        </p>
      </div>
    </>
  );
};

export default Add_To_Cart;
