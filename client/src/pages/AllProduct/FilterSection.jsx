import React, {useEffect, useState } from "react";
// import { FilterCreateContext } from "../Filter_Context/FCreateContext";
// import { BsCheckAll } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  allBrands,
  allCategory,
  allColors,
  fetchAllBrandsAsync,
  fetchAllCategoryAsync,
  fetchAllColorsAsync,
} from "../../redux/productSlice";

const FilterSection = () => {
  const [searchVal, setSearchVal] = useState("");
  const colors = useSelector(allColors);
  const brands = useSelector(allBrands);
  const category = useSelector(allCategory);
  console.log("🚀 ~ FilterSection ~ category:", category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBrandsAsync());
    dispatch(fetchAllColorsAsync());
    dispatch(fetchAllCategoryAsync());
  }, [dispatch]);

  // const SerachContext = useContext(FilterCreateContext);

  // const { updateFilterValue, filters: { text, category, color, rangePrice, max_range_price, min_range_price }, all_products, clearFilters } = SerachContext;

  // We need Unique data for Filters section
  // const getUniqueData = (data, property) => {
  //   let newVal = data.map((curElem) => {
  //     return curElem[property];
  //   });
  //   //to get unique values
  //   if (property === "colors") {
  //     //  return ["All" , ...new Set([].concat(...newVal))]
  //     newVal = newVal.flat();
  //     // we merge the value of all array and then return statement find unique value
  //   }
  //   return ["All", ...new Set(newVal)];
  // };

  // ***********
  // Finding Color unique value in array inside api

  // const colorUniqueArray = (data, property) => {
  //   let getVal = data.map((value, index) => {
  //    let mergeArr = value.colors.flat(1)
  //     console.log(mergeArr);
  //   })
  // }
  // colorUniqueArray(all_products);
  // ********

  // creates unique product
  // // we can pass category because we get multiple data using this function
  // const categoryOnlyData = getUniqueData(all_products, "category"); // category unique data received here
  // // console.log(categoryOnlyData);
  // const companyOnlyData = getUniqueData(all_products, "brand");
  // const colorOnlyData = getUniqueData(all_products, "colors");
  // const rangeOnlyData = getUniqueData(all_products, "range");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="Form_search"
      >
        <input
          type="text"
          name="text"
          id="search"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search..."
        />
      </form>

      <div className="category">
        <h4>Category</h4>
        <div className="flex items-start">
          {category?.map((curElem, index) => {
            return (
              <div className="m-2 space-x-2">
                <input
                  id={curElem.label}
                  type="checkbox"
                  name="category"
                  value={curElem?.value}
                  defaultChecked={curElem?.checked}
                  key={index}
                />
                <label htmlFor={curElem.label}>{curElem.label}</label>
              </div>
            );
          })}
        </div>
      </div>

      <button type="button" className="clear_button">
        CLEAR FILTERS
      </button>
    </>
  );
};

export default FilterSection;
