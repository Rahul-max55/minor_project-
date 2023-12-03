import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartCreateContext } from "./Cart_Context/Cart_Create_Context";
import "./Add_To_Cart.css";
import { MdRemoveCircle } from "react-icons/md";
// import Single_page_quantity from "../Single_page/Single_page_quantity";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import FETCH_WRAPPER from "../Api";

const Add_To_Cart = () => {
  //   let contextValue = useContext(CartCreateContext);
  //   const {
  //     cart,
  //     removeItems,
  //     shipping_fee,
  //     clearCartItem,
  //     increDecre,
  //   } = contextValue;

  useEffect(() => {
    datacart();
  }, []);

  const [cartApiData, setCartApiData] = useState([]);
  const datacart = async () => {
    const data = await FETCH_WRAPPER.get("getCartProduct");
    console.log("🚀 ~ file: Add_To_Cart.jsx:26 ~ datacart ~ data:", data);
    setCartApiData(data?.data);
  };

  const grandTotal = cartApiData?.reduce((total ,value, index) => {
    console.log(value?.stock)
    return total = total + value?.stock * value.price;
  } , 0);

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
                  <img src={value?.image?.[0]?.url} alt="hhh" />
                  <div className="cart_items_details">
                    <p>{value.name}</p>
                    <p className="colorSection">
                      color:{" "}
                      <span
                        className="Single_color cart_color_pro"
                        style={{
                          backgroundColor: value.colors?.[0],
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
                  <p>{value?.stock}</p>
                  {/* <AiFillPlusSquare onClick={() => increDecre(+1, value.id)} /> */}
                </div>
                <div className="cart_price">
                  <h4>{value?.stock * value.price}</h4>
                </div>
                <div className="cart_price">
                  <MdRemoveCircle
                    // onClick={() => {
                    //   removeItems(value?.id, value?.userId);
                    // }}
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
        <button
          className="clear_cart common_css"
        //   onClick={() => {
        //     clearCartItem();
        //   }}
        >
          CLEAR CART
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
