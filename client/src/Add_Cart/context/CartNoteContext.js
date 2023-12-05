import {useState } from "react";
import { CartCreateContext } from "./CartCreateContext";
import FETCH_WRAPPER from "../../Api";

export const CartNoteContext = (props) => {
  const [cartApiData, setCartApiData] = useState([]);
  const [cartApiDataLength, setCartApiDataLength] = useState(0);
  const cartData = async () => {
    const data = await FETCH_WRAPPER.get("getCartProduct");
    console.log("🚀 ~ file: Add_To_Cart.jsx:26 ~ datacart ~ data:", data);
    setCartApiData(data?.data);
    setCartApiDataLength(data?.data?.length);
  };

  return (
    <>
      <CartCreateContext.Provider value={{ cartApiData, cartData , cartApiDataLength }}>
        {props.children}
      </CartCreateContext.Provider>
    </>
  );
};
