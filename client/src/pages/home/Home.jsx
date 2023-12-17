import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Home.css";
import Shopping from "./img/shopping.jpg";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SecurityIcon from "@mui/icons-material/Security";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import logo1 from "./img/logo1.jpg";
import logo2 from "./img/logo2.jpg";
import logo3 from "./img/logo3.png";
import logo4 from "./img/logo4.jpg";
import Products from "./Products";
import { CreateContext } from "../../Contexts/CreateContext";
import testimonial from "./img/testimonial-1.jpg";
import blogone from "./img/blog-1.jpg";
import blogtwo from "./img/blog-2.jpg";
import blogthree from "./img/blog-3.jpg";
import blogfour from "./img/blog-4.jpg";
import ctabanner from "./img/cta-banner.jpg";
import quotes from "./img/quotes.svg";
import { CartCreateContext } from "../../pages/Add_Cart/context/CartCreateContext";

const Home = () => {
  // use Context getting the api data
  const Api_Data = useContext(CreateContext);
  const cartContext = useContext(CartCreateContext);
  const { cartData } = cartContext;
  const { isLoading, featureProducts } = Api_Data; // name is same as initialState name do not wright anything.
  // console.log(featureProducts);

  //For cart data updation
  useEffect(() => {
    cartData();
  }, []);

  return (
    <>
      <div className="cover_photo">
        <div className="right_photo">
          <img src={Shopping} alt="" />
        </div>
        <div className="left_content">
          <h1>
            We Provide<strong> Best Quality </strong>and <br />
            <strong>Lowest Price </strong>in <br /> Clothes
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde
            officiis. Necessitatibus Lorem ipsum, dolor sit amet consectetur
            adipisicing elit.
          </p>
          <NavLink to="/Main_Products_page" className="Shop_button">
            Shop Now
          </NavLink>
        </div>
      </div>

      <div className="all_new_feature1">
        <div className="feature">
          <div className="heading">
            <h1>Our Feature Services</h1>
          </div>
          <div className="all_img">
            {/*We want to print the future product in home page so we use map method and ilitrate products and sending this data using props*/}
            {featureProducts.map((value) => {
              // console.log(value);
              return (
                <Products
                  id={value.id}
                  key={value.id}
                  img={value.image[0]}
                  name={value.name}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="delivery , all_new_feature2">
        <div className="left">
          <LocalShippingIcon />
          <h4>Super Fast and Free Delivery</h4>
        </div>
        <div className="middle">
          <div className="upper">
            <SecurityIcon />
            <h4>Non-Contact Shipping</h4>
          </div>
          <div className="lower">
            <CurrencyRupeeIcon />
            <h4>Money-back guarantee</h4>
          </div>
        </div>
        <div className="right">
          <VpnLockIcon />
          <h4>Super Secure Payment System</h4>
        </div>
      </div>

      <div className="footer">
        <h3>Trusted by 100+ Companies</h3>
        <div className="compnies_logo">
          <img src={logo1} alt="logo" />
          <img src={logo2} alt="logo" />
          <img src={logo3} alt="logo" />
          <img src={logo4} alt="logo" />
        </div>
      </div>

      {/* new section is added */}
      <div>
        <div className="home_container">
          <div className="testimonials-box">
            {/* <!--
          - TESTIMONIALS
          --> */}

            <div className="testimonial">
              <h2 className="title">testimonial</h2>

              <div className="testimonial-card">
                <img
                  src={testimonial}
                  alt="alan doe"
                  className="testimonial-banner"
                  width="80"
                  height="80"
                />

                <p className="testimonial-name">Alan Doe</p>

                <p className="testimonial-title">CEO & Founder Invision</p>

                <img
                  src={quotes}
                  alt="quotation"
                  className="quotation-img"
                  width="26"
                />

                <p className="testimonial-desc">
                  Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor
                  sit amet.
                </p>
              </div>
            </div>

            {/* <!--
      - CTA
    --> */}

            <div className="cta-container">
              <img
                src={ctabanner}
                alt="summer collection"
                className="cta-banner"
              />
              <Link href="#" className="cta-content">
                <p className="discount">25% Discount</p>
                <h2 className="cta-title">Summer collection</h2>
                <p className="cta-text">Starting @ $10</p>
                <button className="cta-btn">Shop now</button>
              </Link>
            </div>

            {/* <!--
      - SERVICE
    --> */}

            <div className="service">
              <h2 className="title">Our Services</h2>
              <div className="service-container">
                <Link href="#" className="service-item">
                  <div className="service-icon">
                    <ion-icon name="boat-outline"></ion-icon>
                  </div>

                  <div className="service-content">
                    <h3 className="service-title">Worldwide Delivery</h3>
                    <p className="service-desc">For Order Over $100</p>
                  </div>
                </Link>

                <Link href="#" className="service-item">
                  <div className="service-icon">
                    <ion-icon name="rocket-outline"></ion-icon>
                  </div>

                  <div className="service-content">
                    <h3 className="service-title">Next Day delivery</h3>
                    <p className="service-desc">UK Orders Only</p>
                  </div>
                </Link>

                <Link href="#" className="service-item">
                  <div className="service-icon">
                    <ion-icon name="call-outline"></ion-icon>
                  </div>

                  <div className="service-content">
                    <h3 className="service-title">Best Online Support</h3>
                    <p className="service-desc">Hours: 8AM - 11PM</p>
                  </div>
                </Link>

                <Link href="#" className="service-item">
                  <div className="service-icon">
                    <ion-icon name="arrow-undo-outline"></ion-icon>
                  </div>

                  <div className="service-content">
                    <h3 className="service-title">Return Policy</h3>
                    <p className="service-desc">Easy & Free Return</p>
                  </div>
                </Link>

                <Link href="#" className="service-item">
                  <div className="service-icon">
                    <ion-icon name="ticket-outline"></ion-icon>
                  </div>

                  <div className="service-content">
                    <h3 className="service-title">30% money back</h3>
                    <p className="service-desc">For Order Over $100</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--
- BLOG
--> */}

      <div className="blog">
        <div className="blog_container">
          <div className="blog-container has-scrollbar">
            <div className="blog-card">
              <Link href="#">
                <img
                  src={blogone}
                  alt="Clothes Retail KPIs 2021 Guide for Clothes Executives"
                  width="300"
                  className="blog-banner"
                />
              </Link>

              <div className="blog-content">
                <Link href="#" className="blog-category">
                  Fashion
                </Link>

                <Link href="#">
                  <h3 className="blog-title">
                    Clothes Retail KPIs 2021 Guide for Clothes Executives.
                  </h3>
                </Link>

                <p className="blog-meta">
                  By <cite>Mr Admin</cite> /{" "}
                  <time datetime="2022-04-06">Apr 06, 2022</time>
                </p>
              </div>
            </div>

            <div className="blog-card">
              <Link href="#">
                <img
                  src={blogtwo}
                  alt="Curbside fashion Trends: How to Win the Pickup Battle."
                  className="blog-banner"
                  width="300"
                />
              </Link>

              <div className="blog-content">
                <Link href="#" className="blog-category">
                  Clothes
                </Link>

                <h3>
                  <Link href="#" className="blog-title">
                    Curbside fashion Trends: How to Win the Pickup Battle.
                  </Link>
                </h3>

                <p className="blog-meta">
                  By <cite>Mr Robin</cite>
                  <time datetime="2022-01-18">Jan 18, 2022</time>
                </p>
              </div>
            </div>

            <div className="blog-card">
              <Link href="#">
                <img
                  src={blogthree}
                  alt="EBT vendors: Claim Your Share of SNAP Online Revenue."
                  className="blog-banner"
                  width="300"
                />
              </Link>

              <div className="blog-content">
                <Link href="#" className="blog-category">
                  Shoes
                </Link>

                <h3>
                  <Link href="#" className="blog-title">
                    EBT vendors: Claim Your Share of SNAP Online Revenue.
                  </Link>
                </h3>

                <p className="blog-meta">
                  By <cite>Mr Selsa</cite>
                  <time datetime="2022-02-10">Feb 10, 2022</time>
                </p>
              </div>
            </div>

            <div className="blog-card">
              <Link href="#">
                <img
                  src={blogfour}
                  alt="Curbside fashion Trends: How to Win the Pickup Battle."
                  className="blog-banner"
                  width="300"
                />
              </Link>

              <div className="blog-content">
                <Link href="#" className="blog-category">
                  Electronics
                </Link>

                <h3>
                  <Link href="#" className="blog-title">
                    Curbside fashion Trends: How to Win the Pickup Battle.
                  </Link>
                </h3>

                <p className="blog-meta">
                  By <cite>Mr Pawar</cite>
                  <time datetime="2022-03-15">Mar 15, 2022</time>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*End new section is added */}
    </>
  );
};

export default Home;
