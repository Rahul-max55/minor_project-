import { CartCreateContext } from "./Cart_Create_Context";
import React, { useReducer, useEffect } from "react";
import reducer from "./Cart_Reducer";
import axios from "axios";
import FETCH_WRAPPER from "../../Api";

const Cart_Note_Context = ({ children }) => {
  const initialState = {
    cart: [],
    total_item: "",
    total_amount: "",
    shipping_fee: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const addCart = async (singlePageData, colorCheck, counter) => {
    const data = await FETCH_WRAPPER.post("addCartProduct", {
      ...singlePageData,
      colors: colorCheck,
      stock: counter,
    });
    console.log("🚀 ~ file: Cart_Note_Context.js:20 ~ addCart ~ data:", data);
    dispatch({
      type: "ADD_TO_CART",
      payload: data,
    });
  };

  // calculate all cart items

  const totalCartItems = (cart) => {
    // let totalProduct = 0;
    let grandCartTotal = 0;
    // let productSubtotal;
    cart.map((v) => {
      // totalProduct = totalProduct + v.orderQuantity;
      grandCartTotal = grandCartTotal + v.FinalProductPrice;
      return grandCartTotal;
    });
    dispatch({ type: "TOTAL_ITEMS", payload: { grandCartTotal } });
  };

  useEffect(() => {
    totalCartItems(state.cart);
  }, [state.cart]);

  // calculation end all cart items

  // remove items code here
  const removeItems = async (id) => {
    try {
      await FETCH_WRAPPER.delete(`deleteProduct/${id}`);
      dispatch({ type: "REMOVE_ITEMS", payload: id });
    } catch (error) {
      console.log(
        "🚀 ~ file: Cart_Note_Context.js:63 ~ removeItems ~ error:",
        error
      );
    }
  };
  //    created a clear button functionality

  const clearCartItem = () => {
    dispatch({ type: "CLEAR_ALL_CART" });
  };

  //This is our cart items increment and decrement feature

  const increDecre = (value, id) => {
    dispatch({ type: "INCREMENT_DECREMENT_CART", payload: { value, id } });
  };

  return (
    <CartCreateContext.Provider
      value={{ ...state, addCart, removeItems, clearCartItem, increDecre }}
    >
      {children}
    </CartCreateContext.Provider>
  );
};

export default Cart_Note_Context;
// export { CartCreateContext };
