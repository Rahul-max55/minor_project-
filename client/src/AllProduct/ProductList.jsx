import React from "react";
import { NavLink } from "react-router-dom";

const ProductList = ({
  id,
  price,
  category,
  description,
  filename,
  images,
  name,
  columnRow,
}) => {
  return (
    <>
      <NavLink
        to={`/singleproduct/${id}`}
        className={columnRow === "false" ? " " : "Anchor_Row"}
      >
        {/* This is our Grid view */}
        {columnRow === "false" ? (
          <div className="prod_card">
            <div className="main_img">
              <p className="nameofprod">{category}</p>
              <img src={images?.[0]} alt={filename} />
            </div>
            <div className="main_img_bottum">
              <p className="model_name">{name}</p>
              <p className="model_price">{price}</p>
            </div>
          </div>
        ) : (
          //  This is our List view
          <div className="prod_card Row">
            <div className="main_img">
              <img src={images?.[0]} alt={filename} />
            </div>
            <div className="main_img_bottum_row">
              <p className="model_name">{name}</p>
              <p className="model_price">{price}</p>
              <p className="description_row_view">{description}</p>
              <button type="button" className="Add_cart_btn Row_btn">
                Read More
              </button>
            </div>
          </div>
        )}
      </NavLink>
    </>
  );
};

export default ProductList;
