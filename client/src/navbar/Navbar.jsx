import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import {
  Link,
  NavLink,
  Navigate,
  redirect,
  useNavigate,
} from "react-router-dom";
import logo from "./img/shopCenternew.jpg";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { BsCartPlusFill, BsTypeH1 } from "react-icons/bs";
// import { Create_context } from "../Contexts/NoteContext";
import { Create_context } from "../Contexts/CreateContext";
import { CartCreateContext } from "../Add_Cart/Cart_Context/Cart_Create_Context";
import { PATHS } from "../routes/paths";
// import { useEffect } from 'react';

const Navbar = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Finding the login signUp value using CreateContext
  const context = useContext(Create_context);
  let { change_logSign, login_signup } = context;
  console.log("🚀 ~ file: Navbar.jsx:27 ~ Navbar ~ login_signup:", login_signup)
  // End Finding the login signUp value using CreateContext

  // Finding the value of cart using create cart context
  const cart_context = useContext(CartCreateContext);
  let { cart } = cart_context;
  let productQuantity = cart.length;
  // End Finding the value of cart using create cart context

  // for responsive
  const navRef1 = useRef();
  const navRef2 = useRef();
  const navRef3 = useRef();
  const navRef4 = useRef();

  const showNavbar = () => {
    navRef1.current.classList.toggle("responsive_con");
    navRef2.current.classList.toggle("responsive_navbar");
    navRef3.current.classList.toggle("responsive_ul");
    navRef4.current.classList.toggle("responsive_icons");
  };
  //End for responsive

  const logout = () => {
    localStorage.clear();
    navigate("/login_signup");
  };

  const icon = token
    ? {
        width: "20%",
        height: "60px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }
    : {
        width: "75%",
        height: "60px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      };

  return (
    <>
      <header>
        {token && (
          <>
            {/* mobile header */}
            <div className="mobile_header" onClick={showNavbar}>
              <div className="burger">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </>
        )}

        {/* mobile header */}

        <div className="container" ref={navRef1}>
          <Link to="/" className="logo">
            <img src={logo} alt="ShopCenter_Logo" />
          </Link>
          {token && (
            <nav className="navbar" ref={navRef2}>
              <ul ref={navRef3}>
                <li>
                  <NavLink to="/"> Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about"> About Clothes</NavLink>
                </li>
                <li>
                  <NavLink to="/main_products_page"> Products Clothes</NavLink>
                </li>
                <li>
                  <NavLink to="/Contact"> Contact</NavLink>
                </li>
              </ul>
            </nav>
          )}
          <div className="icons" ref={navRef4} style={icon}>
            {!token ? (
              <NavLink
                onClick={change_logSign}
                to="/login_signup"
                style={{ color: "white" }}
              >
                <button>{login_signup === "true" ? "Login" : "SignUp"}</button>
              </NavLink>
            ) : (
              <button onClick={logout} style={{ color: "white" }}>
                Logout
              </button>
            )}
            {token && (
              <>
                <a href="/">
                  <TwitterIcon />
                </a>
                <a href="/">
                  <FacebookIcon />
                </a>
                <NavLink to="/add_to_cart" className="Cart_Icon">
                  <BsCartPlusFill />
                  <div className="total_items">{productQuantity}</div>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
