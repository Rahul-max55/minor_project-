import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import Sort from "./Sort";
import ProductList from "./ProductList";
import "./Main_Products_page.css";
import { allProducts, fetchAllProductsAsync } from "../../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { pageLimit } from "../../redux/Constant";

const Main_Products_page = () => {
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  console.log("🚀 ~ products:", products);
  const [columnRow, setColumnRow] = useState("false");
  const [sorting, setSorting] = useState("false");
  const [page, setPage] = useState(1);

  const changeRow = () => {
    setColumnRow("true");
  };

  const changeColumn = () => {
    setColumnRow("false");
  };

  // for pagination
  // TODO: totalPage is hardCoded we need to return the totalPage at the time of creating filter api
  let totalItems = 30;
  const totalPage = Math.floor(totalItems / 10);
  // Create paginationArray only if totalPage is a valid number
  const paginationArray = Number.isFinite(totalPage)
    ? Array.from(new Array(totalPage))
    : [];
  // for pagination

  // const Fcontext = useContext(CreateContext);
  // const { getProducts } = Fcontext;

  // const Product_context = useContext(Create_Context);
  // const { products } = Product_context;
  // const Filter_context = useContext(FilterCreateContext);
  // const { sorting, products } = Filter_context;
  // console.log(products);

  // console.log(products);

  // End product loading

  // console.log(columnRow);

  return (
    <>
      <div className="product_container">
        <div className="p-2 rounded-lg w-3/12 mt-1">
          <FilterSection page={page} />
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
              <option value="a_z">Name: button-z</option>
              <option value="z_a">Name: z-button</option>
              <option value="low_high">Price: low-high</option>
              <option value="high_low">Price: high-low</option>
            </select>
          </div>
          <div className="product_list">
            {products?.data && products?.data?.map((value) => {
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

          {/* pagination */}
          <nav className="text-center mt-16">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <button
                  onClick={() => (1 < page ? setPage(page - 1) : setPage(1))}
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              {paginationArray?.map((val, index) => (
                <li>
                  <button
                    key={index}
                    onClick={(e) => setPage(+e.target.value)}
                    value={index + 1}
                    className={`${
                      page === index + 1 && "!bg-blue-500 text-white"
                    } flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() =>
                    page < totalPage
                      ? setPage(page + 1)
                      : setPage(totalPage)
                  }
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
          {/* pagination */}
        </div>
      </div>
    </>
  );
};

export default Main_Products_page;
