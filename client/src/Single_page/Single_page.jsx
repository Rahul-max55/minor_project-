import React, { useContext, useEffect , useState} from 'react'
import { useParams  } from 'react-router-dom';
import "./Single_page.css";
import Single_page_img from "./Single_page_img";
import {CreateContext} from '../Contexts/CreateContext';
import Single_page_stars from './Single_page_stars';
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { BsFillAwardFill } from "react-icons/bs";
import { AiOutlineFileProtect } from "react-icons/ai";
import Single_page_colors from "./Single_page_colors";
import Single_page_quantity from './Single_page_quantity';
import AddCartButton from './AddCartButton';

const Product_API = "http://localhost:3001/user/products/";

const Single_page = () => {

  const context = useContext(CreateContext);
  const { singleProduct, singlePageData, colorCheck, setColorCheck } = context;
  console.log("🚀 ~ file: Single_page.jsx:20 ~ singlePageData:", singlePageData)

  let { name, stars, company, price, description, stock, image  } = singlePageData;


  // console.log(colors);
  console.log(singlePageData);

// we getting the id in URL using useParams
  const { id } = useParams();
  console.log("🚀 ~ file: Single_page.jsx:28 ~ id:", id)

  useEffect(() => {
    singleProduct(`${Product_API}${id}`);
  }, [id])

  
  // Number of products order(Single_Page_quantity)
  const [counter, setCounter] = useState(1);
  const increment = () => {
    stock > counter ? setCounter(counter + 1) : setCounter(counter); 
  }

  const decrement = () => {
    counter > 1 ? setCounter(counter - 1) : setCounter(counter);
  }


  return (
    <div className="product_card">
      <Single_page_img imgs={image} />
      <div className="right">
        <h1>{name}</h1>
        <div className="rating">
          <Single_page_stars stars={stars} />
        </div>
        <p>MRP: <del>{price}</del></p>
        <p className='dealOfDay'>Deal of the day:{Math.round((price * 70) / 100)}</p>
        <p>{description}</p>
        <div className="icons_details">
          <div className="icon_content">
            <TbTruckDelivery />
            <p>Free Delivery</p>
          </div>
          <div className="icon_content">
            <TbReplace />
            <p>30 day Replacement</p>
          </div>
          <div className="icon_content">
            <AiOutlineFileProtect />
            <p>Assured</p>
          </div>
          <div className="icon_content">
            <BsFillAwardFill />
            <p>2 Year Warranty</p>
          </div>
        </div>
        <p>Available: {stock < 1 ? "Out of Stock" : "In Stock"}</p>
        <p>Brand: {company}</p>
        <hr className='horizontal_line' />
        <div className="colors">
          <Single_page_colors singlePageData={singlePageData} colorCheck={colorCheck} setColorCheck={setColorCheck} />
        </div>
        <div className="Quantity">
          <Single_page_quantity increment={increment} decrement={decrement} counter={ counter} />
        </div>
        <AddCartButton singlePageData={singlePageData} colorCheck={colorCheck} counter={counter} />
      </div>
    </div>
  )
}

export default Single_page;
