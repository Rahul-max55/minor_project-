import React from "react";
// import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import { CartCreateContext } from "../Add_Cart/Cart_Context/Cart_Create_Context";
import FETCH_WRAPPER from "../../Api";

const AddCartButton = ({ singlePageData, colorCheck, counter }) => {
  // let context = useContext(CartCreateContext);
  // const { addCart } = context;

  // const [colorData, setColorData] = useState(colors?.[0]);
  // const [amount, setAmount] = useState(2);

  const addCart = async (singlePageData, colorCheck, counter) => {
    try {
      const data = await FETCH_WRAPPER.post("addCartProduct", {
        ...singlePageData,
        colors: colorCheck,
        customerStock: counter,
      });
      // console.log("🚀 ~ file: Cart_Note_Context.js:20 ~ addCart ~ data:", data?.data?.msg);
      alert(data?.data?.msg)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavLink to="/Add_to_cart">
        <button
          className="Add_cart_btn"
          onClick={() => addCart(singlePageData, colorCheck, counter)}
        >
          Add to Cart
        </button>
      </NavLink>
    </>
  );
};

export default AddCartButton;
