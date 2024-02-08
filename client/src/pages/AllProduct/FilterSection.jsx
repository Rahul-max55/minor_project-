import React, { useEffect, useState } from "react";
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
  filterProductAsync,
} from "../../redux/productSlice";

const FilterSection = () => {
  const [searchVal, setSearchVal] = useState("");
  const [filterVal, setFilterVal] = useState([]);
  const colors = useSelector(allColors);
  const brands = useSelector(allBrands);
  const category = useSelector(allCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBrandsAsync());
    dispatch(fetchAllColorsAsync());
    dispatch(fetchAllCategoryAsync());
  }, [dispatch]);

  const handleFilter = (name, value) => {
    setFilterVal((prevState) => {
      // Check if the value already exists in the array
      if (prevState[name] && prevState[name].includes(value)) {
        // If it does, filter it out from the array
        const filteredArray = prevState[name].filter((item) => item !== value);
        // Return the state with the filtered array
        return {
          ...prevState,
          [name]: filteredArray,
        };
      }
      return {
        ...prevState,
        [name]: [...(prevState[name] || []), value],
      };
    });
    console.log("hello");
    dispatch(filterProductAsync(filterVal));
  };

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
    <div className="space-y-4">
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

      <div className="p-2 rounded-lg shadow-md">
        <h4 className="m-2">Category</h4>
        <div>
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
                  onChange={(e) => handleFilter(e.target.name, e.target.value)}
                />
                <label htmlFor={curElem.label}>{curElem.label}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-2 rounded-lg shadow-md">
        <h4 className="m-2">Brands</h4>
        <div>
          {brands?.map((curElem, index) => {
            return (
              <div className="m-2 space-x-2">
                <input
                  id={curElem.label}
                  type="checkbox"
                  name="brands"
                  value={curElem?.value}
                  defaultChecked={curElem?.checked}
                  key={index}
                  onChange={(e) => handleFilter(e.target.name, e.target.value)}
                />
                <label htmlFor={curElem.label}>{curElem.label}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-2 rounded-lg shadow-md">
        <h4 className="m-2">Colors</h4>
        <div>
          {colors?.map((curElem, index) => {
            return (
              <div className="m-2 space-x-2">
                <input
                  id={curElem.label}
                  type="checkbox"
                  name="colors"
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
    </div>
  );
};

export default FilterSection;
