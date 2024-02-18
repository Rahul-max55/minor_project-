import React from "react";
// import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import { CartCreateContext } from "../Add_Cart/Cart_Context/Cart_Create_Context";
import { useDispatch } from "react-redux";
import { addCartDataAsync } from "../../redux/productSlice";

const AddCartButton = ({ Product, colorCheck, counter }) => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  // let context = useContext(CartCreateContext);
  // const { addCart } = context;

  // const [colorData, setColorData] = useState(colors?.[0]);
  // const [amount, setAmount] = useState(2);

  const addCart = async (Product, colorCheck, counter) => {
    console.log("🚀 ~ addCart ~ Product:", Product, colorCheck, counter);
    const newId = new Date().getTime().toString();
    // const { id, ...cartDataWithoutId } = Product;
    const cartData = {
      ...Product,
      id: newId,
      colors: colorCheck,
      customerStock: counter,
      userId,
    };
    console.log("🚀 ~ addCart ~ cartData:", cartData);
    dispatch(addCartDataAsync(cartData));
  };

  return (
    <>
      <NavLink to="/Add_to_cart">
        <button
          className="Add_cart_btn"
          onClick={() => addCart(Product, colorCheck, counter)}
        >
          Add to Cart
        </button>
      </NavLink>
    </>
  );
};

export default AddCartButton;
