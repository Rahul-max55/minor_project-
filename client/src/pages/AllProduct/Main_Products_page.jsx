import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import Sort from "./Sort";
import ProductList from "./ProductList";
import "./Main_Products_page.css";
import { allProducts, fetchAllProductsAsync } from "../../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { pageLimit } from "../../redux/Constant";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Main_Products_page = () => {
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState(false);
  const products = useSelector(allProducts);
  const [columnRow, setColumnRow] = useState("false");
  const [sorting, setSorting] = useState({});
  const [page, setPage] = useState(1);

  const changeRow = () => {
    setColumnRow("true");
  };

  const changeColumn = () => {
    setColumnRow("false");
  };

  // for pagination
  // TODO: totalPage is hardCoded we need to return the totalPage at the time of creating filter api
  let totalItems = products?.totalProducts;
  const totalPage = Math.ceil(totalItems / 10);
  console.log("🚀 ~ totalPage:", totalPage)
  // Create paginationArray only if totalPage is a valid number
  const paginationArray = Number.isFinite(totalPage)
    ? Array.from(new Array(totalPage))
    : [];
  // for pagination

  // for sorting
  const sortObj = [
    { sort: 1, field: "name", label: "a-z" },
    { sort: -1, field: "name", label: "z-a" },
    { sort: 1, field: "price", label: "low-high" },
    { sort: -1, field: "price", label: "high-low" },
  ];

  const handleSort = (obj) => {
    setSorting(obj);
  };

  return (
    <>
      <div className="product_container">
        <div className="p-2 rounded-lg w-3/12 mt-1">
          <FilterSection page={page} sorting={sorting} setPage={setPage}/>
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

            <div className="relative">
              <span className="flex justify-between items-center">
                <h4 className="m-2 ">Category</h4>
                <span className="mr-2" onClick={() => setCollapse(!collapse)}>
                  {!collapse.cate ? <FaPlus /> : <FaMinus />}
                </span>
              </span>
              <div
                className={`m-2 overflow-hidden rounded-lg transition-all absolute bg-white shadow-lg ${
                  !collapse ? "h-0 !m-0" : "h-44 w-36"
                }`}
              >
                {sortObj?.map((curElem, index) => {
                  return (
                    <div key={index} className="p-2">
                      <input
                        id={curElem.label}
                        type="radio"
                        name="category"
                        value={curElem?.sort}
                        defaultChecked={curElem?.checked}
                        onChange={() => handleSort(curElem)}
                      />
                      <label className="px-2" htmlFor={curElem.label}>
                        {curElem.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="product_list">
            {products?.data &&
              products?.data?.map((value) => {
                return (
                  <ProductList
                    columnRow={columnRow}
                    description={value.description}
                    id={value.id}
                    key={value.id}
                    category={value.category}
                    filename={value.filename}
                    images={value.images}
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
                    page < totalPage ? setPage(page + 1) : setPage(totalPage)
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
