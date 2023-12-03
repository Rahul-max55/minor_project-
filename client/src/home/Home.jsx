import React, { useContext } from "react";
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
import {CreateContext} from "../Contexts/CreateContext";
import testimonial from "./img/testimonial-1.jpg";
import blogone from "./img/blog-1.jpg";
import blogtwo from "./img/blog-2.jpg";
import blogthree from "./img/blog-3.jpg";
import blogfour from "./img/blog-4.jpg";
import ctabanner from "./img/cta-banner.jpg";
import quotes from "../home/img/quotes.svg";

const Home = () => {
  // use Context getting the api data
  const Api_Data = useContext(CreateContext);
  const { isLoading, featureProducts } = Api_Data; // name is same as initialState name do not wright anything.
  console.log(featureProducts);

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
              console.log(value);
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
        <div class="home_container">
          <div class="testimonials-box">
            {/* <!--
          - TESTIMONIALS
          --> */}

            <div class="testimonial">
              <h2 class="title">testimonial</h2>

              <div class="testimonial-card">
                <img
                  src={testimonial}
                  alt="alan doe"
                  class="testimonial-banner"
                  width="80"
                  height="80"
                />

                <p class="testimonial-name">Alan Doe</p>

                <p class="testimonial-title">CEO & Founder Invision</p>

                <img
                  src={quotes}
                  alt="quotation"
                  class="quotation-img"
                  width="26"
                />

                <p class="testimonial-desc">
                  Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor
                  sit amet.
                </p>
              </div>
            </div>

            {/* <!--
      - CTA
    --> */}

            <div class="cta-container">
              <img src={ctabanner} alt="summer collection" class="cta-banner" />
              <Link href="#" class="cta-content">
                <p class="discount">25% Discount</p>
                <h2 class="cta-title">Summer collection</h2>
                <p class="cta-text">Starting @ $10</p>
                <button class="cta-btn">Shop now</button>
              </Link>
            </div>

            {/* <!--
      - SERVICE
    --> */}

            <div class="service">
              <h2 class="title">Our Services</h2>
              <div class="service-container">
                <Link href="#" class="service-item">
                  <div class="service-icon">
                    <ion-icon name="boat-outline"></ion-icon>
                  </div>

                  <div class="service-content">
                    <h3 class="service-title">Worldwide Delivery</h3>
                    <p class="service-desc">For Order Over $100</p>
                  </div>
                </Link>

                <Link href="#" class="service-item">
                  <div class="service-icon">
                    <ion-icon name="rocket-outline"></ion-icon>
                  </div>

                  <div class="service-content">
                    <h3 class="service-title">Next Day delivery</h3>
                    <p class="service-desc">UK Orders Only</p>
                  </div>
                </Link>

                <Link href="#" class="service-item">
                  <div class="service-icon">
                    <ion-icon name="call-outline"></ion-icon>
                  </div>

                  <div class="service-content">
                    <h3 class="service-title">Best Online Support</h3>
                    <p class="service-desc">Hours: 8AM - 11PM</p>
                  </div>
                </Link>

                <Link href="#" class="service-item">
                  <div class="service-icon">
                    <ion-icon name="arrow-undo-outline"></ion-icon>
                  </div>

                  <div class="service-content">
                    <h3 class="service-title">Return Policy</h3>
                    <p class="service-desc">Easy & Free Return</p>
                  </div>
                </Link>

                <Link href="#" class="service-item">
                  <div class="service-icon">
                    <ion-icon name="ticket-outline"></ion-icon>
                  </div>

                  <div class="service-content">
                    <h3 class="service-title">30% money back</h3>
                    <p class="service-desc">For Order Over $100</p>
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

      <div class="blog">
        <div class="blog_container">
          <div class="blog-container has-scrollbar">
            <div class="blog-card">
              <Link href="#">
                <img
                  src={blogone}
                  alt="Clothes Retail KPIs 2021 Guide for Clothes Executives"
                  width="300"
                  class="blog-banner"
                />
              </Link>

              <div class="blog-content">
                <Link href="#" class="blog-category">
                  Fashion
                </Link>

                <Link href="#">
                  <h3 class="blog-title">
                    Clothes Retail KPIs 2021 Guide for Clothes Executives.
                  </h3>
                </Link>

                <p class="blog-meta">
                  By <cite>Mr Admin</cite> /{" "}
                  <time datetime="2022-04-06">Apr 06, 2022</time>
                </p>
              </div>
            </div>

            <div class="blog-card">
              <Link href="#">
                <img
                  src={blogtwo}
                  alt="Curbside fashion Trends: How to Win the Pickup Battle."
                  class="blog-banner"
                  width="300"
                />
              </Link>

              <div class="blog-content">
                <Link href="#" class="blog-category">
                  Clothes
                </Link>

                <h3>
                  <Link href="#" class="blog-title">
                    Curbside fashion Trends: How to Win the Pickup Battle.
                  </Link>
                </h3>

                <p class="blog-meta">
                  By <cite>Mr Robin</cite>
                  <time datetime="2022-01-18">Jan 18, 2022</time>
                </p>
              </div>
            </div>

            <div class="blog-card">
              <Link href="#">
                <img
                  src={blogthree}
                  alt="EBT vendors: Claim Your Share of SNAP Online Revenue."
                  class="blog-banner"
                  width="300"
                />
              </Link>

              <div class="blog-content">
                <Link href="#" class="blog-category">
                  Shoes
                </Link>

                <h3>
                  <Link href="#" class="blog-title">
                    EBT vendors: Claim Your Share of SNAP Online Revenue.
                  </Link>
                </h3>

                <p class="blog-meta">
                  By <cite>Mr Selsa</cite>
                  <time datetime="2022-02-10">Feb 10, 2022</time>
                </p>
              </div>
            </div>

            <div class="blog-card">
              <Link href="#">
                <img
                  src={blogfour}
                  alt="Curbside fashion Trends: How to Win the Pickup Battle."
                  class="blog-banner"
                  width="300"
                />
              </Link>

              <div class="blog-content">
                <Link href="#" class="blog-category">
                  Electronics
                </Link>

                <h3>
                  <Link href="#" class="blog-title">
                    Curbside fashion Trends: How to Win the Pickup Battle.
                  </Link>
                </h3>

                <p class="blog-meta">
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
