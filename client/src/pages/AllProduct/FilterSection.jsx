import React, { useContext , useEffect } from 'react';
import { FilterCreateContext } from './Filter_Context/FCreateContext';
import { BsCheckAll } from "react-icons/bs";


const FilterSection = () => {

  const SerachContext = useContext(FilterCreateContext);

  const { updateFilterValue, filters: { text, category, color, rangePrice, max_range_price, min_range_price }, all_products, clearFilters } = SerachContext;

  // We need Unique data for Filters section
  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property]
    })
    //to get unique values
    if (property === "colors") {
      //  return ["All" , ...new Set([].concat(...newVal))]
      newVal = newVal.flat()
      // we merge the value of all array and then return statement find unique value
    }
    return ["All", ...new Set(newVal)]

  

  }

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
  // we can pass category because we get multiple data using this function
  const categoryOnlyData = getUniqueData(all_products, "category"); // category unique data received here
  // console.log(categoryOnlyData);
  const companyOnlyData = getUniqueData(all_products, "company");
  const colorOnlyData = getUniqueData(all_products, "colors");
  const rangeOnlyData = getUniqueData(all_products, "range");


  

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault() }} className="Form_search">
        <input type="text" name="text" id="search" value={text} onChange={updateFilterValue} placeholder='Search...' />
      </form>
      <div className="category">
        <h4>Category</h4>
        <div className="category_data">
          {
            categoryOnlyData.map((curElem, index) => {
              return <button type='button' name="category" value={curElem} onClick={updateFilterValue} key={index}>{curElem}</button>
            })
          }
        </div>
      </div>
      <div className="company">
        <h4>Company</h4>
        <form action="#" className="Form_search">
          <select name="company" id="brand" onClick={updateFilterValue}>
            {
              companyOnlyData.map((curElem, index) =>{ 
                return <option name="company" value={curElem} key={index}>
                  {curElem}
                </option>
              })
            }
          </select>
        </form>
      </div>
      <div className="color">
        <h3>Colors :</h3>
        <div className="all_colors">
          {
            colorOnlyData.map((value, index) => {
              if (value === "All") {
                return (<button type="button" className="color_red_all_fun" name="color" key={index} value={value} onClick={updateFilterValue}>{value}</button>)
              } else {

                return (<button type="button" className={color === value ? "color_red Active" : "color_red"} name="color" key={index} value={value} style={{ backgroundColor: value }} onClick={updateFilterValue}>{color === value ? <BsCheckAll /> : null}</button>)
              }
            })
          }
        </div>
      </div>
      <div className="price">
        <h3>Price</h3>
        <p>{rangePrice}</p>
        <input type="range" name="rangePrice" id="range" value={rangePrice} min={min_range_price} max={max_range_price} onChange={updateFilterValue} />
      </div>
      <button type='button' className='clear_button' onClick={clearFilters} >CLEAR FILTERS</button>

    </>
  )
}

export default FilterSection