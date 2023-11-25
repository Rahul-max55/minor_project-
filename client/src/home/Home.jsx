import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import "./Home.css";
import Shopping from "./img/shopping.jpg"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SecurityIcon from '@mui/icons-material/Security';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import logo1 from "./img/logo1.jpg"
import logo2 from "./img/logo2.jpg"
import logo3 from "./img/logo3.png"
import logo4 from "./img/logo4.jpg"
import Products from './Products';
import { Create_context } from '../Contexts/CreateContext';


const Home = () => {
    // use Context getting the api data
    const Api_Data = useContext(Create_context);
    const { isLoading, featureProducts } = Api_Data; // name is same as initialState name do not wright anything.
    console.log(featureProducts);

    return (
        <>
            <div className="cover_photo">
                <div className="right_photo">
                    <img src={Shopping} alt="" />
                </div>
                <div className="left_content">
                    <h1>We Provide<strong> Best  Quality </strong>and <br /><strong>Lowest Price </strong>in <br /> Clothes</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde officiis. Necessitatibus Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <NavLink to="/Main_Products_page" className='Shop_button' >
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
                            return <Products id={value.id} key={value.id} img={value.image} name={value.name} />;
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
        </>
    )
}



export default Home;