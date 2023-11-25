import React from 'react';
import { NavLink } from "react-router-dom";
import "./Home.css";


// passing props in home.js file
const Products = (props) => {

  return (
    <>
      <NavLink to={`/singleproduct/${props.id}`}>
        <div>
          <img src={props.img} alt={props.name} />
          <h4>{props.name}</h4>
        </div>
      </NavLink> 
    </>
  )
}

export default Products