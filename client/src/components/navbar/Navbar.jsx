import React, { useContext, useEffect, useRef, useState } from "react";
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
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { cartData } from "../../redux/productSlice";
import { PATHS } from "../../routes/paths";
// import { useEffect } from 'react';
import Signup from "./../../pages/Login_Signup/Signup";

const Navbar = () => {
  const [user, setUser] = useState({});
  const cartProducts = useSelector(cartData);

  const change_logSign = () => {
    localStorage.getItem("login_signup")
      ? localStorage.setItem("login_signup", true)
      : localStorage.setItem("login_signup", false);
  };

  const navigate = useNavigate();
  const token = Cookies.get("token");

  // console.log("🚀 ~ file: Navbar.jsx:26 ~ Navbar ~ user:", user);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  // Finding the value of cart using create cart context
  // const cart_context = useContext(CartCreateContext);
  // let { cart } = cart_context;
  // let productQuantity = cart.length;
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
    Cookies.remove("token");
    navigate(PATHS.login);
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
      <header className="fixed z-9999">
        {token && (
          <>
            {/* mobile header */}
            <div className="mobile_header " onClick={showNavbar}>
              <div className="burger">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </>
        )}

        {/* mobile header */}

        <div className="container_nav" ref={navRef1}>
          <Link to="/" className="logo">
            <img src={logo} alt="ShopCenter_Logo" />
          </Link>
          {token && (
            <nav className="navbar " ref={navRef2}>
              <ul ref={navRef3}>
                <li>
                  <NavLink to="/"> Home</NavLink>
                </li>

                <li>
                  <NavLink to="/main_products_page"> Products</NavLink>
                </li>
                <li>
                  <NavLink to="/order"> All Order</NavLink>
                </li>
                <li>
                  <NavLink to="/Contact"> Contact</NavLink>
                </li>
              </ul>
            </nav>
          )}
          <div className="icons" ref={navRef4} style={icon}>
            {!token ? (
              <>
                <NavLink
                  onClick={change_logSign}
                  to={PATHS.login}
                  style={{ color: "white" }}
                >
                  <button>Login</button>
                </NavLink>
                <NavLink
                  onClick={change_logSign}
                  to={PATHS.signup}
                  style={{ color: "white" }}
                >
                  <button>Signup</button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  onClick={logout}
                  to={PATHS.login}
                  style={{ color: "white" }}
                >
                  <button>Logout</button>
                </NavLink>
                <a href="/setting">
                  <div className="user_icon">
                    <img
                      src={`http://localhost:3001/${user.profileImage}`}
                      alt="prof"
                    />
                  </div>
                </a>
                <a href="/">
                  <FacebookIcon />
                </a>
                <NavLink to="/add_to_cart" className="Cart_Icon">
                  <BsCartPlusFill />
                  <div className="total_items">{cartProducts.length}</div>
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
