import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartCreateContext } from "./Cart_Context/Cart_Create_Context";
import "./Add_To_Cart.css";
import { MdRemoveCircle } from "react-icons/md";
// import Single_page_quantity from "../Single_page/Single_page_quantity";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";


const Add_To_Cart = () => {

    let contextValue = useContext(CartCreateContext);
    const { cart, removeItems, shipping_fee, grandTotal, clearCartItem, increDecre } = contextValue;
    // console.log(cart);


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

                {cart.length > 0 ?
                    cart.map((value) => {
                        // console.log(value.Product_total_amount);
                        return <div className="cart_All_items " key={value.id} >
                            <div className="cart_items">
                                <img src={value?.image} alt="hhh" />
                                <div className="cart_items_details">
                                    <p>{value.name}</p>
                                    <p className="colorSection" >color: <span className="Single_color cart_color_pro" style={{ backgroundColor: value.color, opacity: "1" }} ></span></p>
                                </div>
                            </div>
                            <div className="cart_price">
                                <h4>{value.price}</h4>
                            </div>
                            <div className="cart_price">
                                <AiFillMinusSquare onClick={() => increDecre(-1, value.id)}/>
                                <p>{value.orderQuantity}</p>
                                <AiFillPlusSquare onClick={() => increDecre(+1, value.id)}/>
                            </div>
                            <div className="cart_price">
                                <h4>{value.FinalProductPrice}</h4>
                            </div>
                            <div className="cart_price">
                                <MdRemoveCircle onClick={() => { removeItems(value.id) }} />
                            </div>
                        </div>
                    })
                    : <div className="Cart_msg">No Products Added in Card</div>
                }


            </div>
            <div className="two_buttons">
                <NavLink to="/" className="common_css">
                    CONTINUE SHOPPING
                </NavLink>
                <button className="clear_cart common_css" onClick={() => { clearCartItem() }} >CLEAR CART</button>
            </div>

            <div className="cart_total">
                <p>Subtotal: <span> {grandTotal}</span></p>
                <p>Shipping Fee: <span> {shipping_fee}</span></p>
                <hr />
                <p>Order Total:<span> {grandTotal + shipping_fee}</span ></p>
            </div>
        </>
    )
}


export default Add_To_Cart;