import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import Sort from "./Sort";
import ProductList from "./ProductList";
import "./Main_Products_page.css";
import { allProducts, fetchAllProductsAsync } from "../../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";

const Main_Products_page = () => {
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  const [columnRow, setColumnRow] = useState("false");
  const [sorting, setSorting] = useState("false");
  const changeRow = () => {
    setColumnRow("true");
  };
  const changeColumn = () => {
    setColumnRow("false");
  };

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  // const Fcontext = useContext(CreateContext);
  // const { getProducts } = Fcontext;

  // const Product_context = useContext(Create_Context);
  // const { products } = Product_context;
  // const Filter_context = useContext(FilterCreateContext);
  // const { sorting, products } = Filter_context;
  // console.log(products);

  // console.log(products);

  // for product loading
  useEffect(() => {
    // getProducts();
  }, []);

  // End product loading

  // console.log(columnRow);

  return (
    <>
      <div className="product_container">
        <div className="filter_section">
          <FilterSection />
        </div>
        <div className="sort_products">
          <div className="sort_section">
            <Sort
              columnRow={columnRow}
              changeRow={changeRow}
              changeColumn={changeColumn}
            />
            <p>
              Total Products <span>{products?.length}</span>
            </p>
            <select
              name="price"
              id="sortProducts"
              onClick={(e) => setSorting(e.target.value)}
            >
              <option value="selected_Value">Select your preference</option>
              <option value="a_z">Name: a-z</option>
              <option value="z_a">Name: z-a</option>
              <option value="low_high">Price: low-high</option>
              <option value="high_low">Price: high-low</option>
            </select>
          </div>
          <div className="product_list">
            {products?.map((value) => {
              return (
                <ProductList
                  columnRow={columnRow}
                  description={value.description}
                  id={value.id}
                  key={value.id}
                  category={value.category}
                  filename={value.filename}
                  image={value.images}
                  name={value.name}
                  price={value.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main_Products_page;
