const Filter_reducer = (state, action) => {

    switch (action.type) {
        case 'LOAD_FILTER_PRODUCTS':

            let priceArr = action.payload.map((curElem) => {
                return curElem.price;
            })

            // console.log(Math.max.apply(null, priceArr));
            let max_price = Math.max(...priceArr);
            let min_price = Math.min(...priceArr);

            return {
                ...state,
                filtered_products: [...action.payload],
                all_products: [...action.payload],
                filters: {
                    ...state.filters,
                    rangePrice: max_price,
                    max_range_price: max_price,
                    min_range_price: min_price,
                }
            }


        case "GET_SORT_VALUE":

            // let userSortValue = document.getElementById("sortProducts").value;
            // let sort_value = userSortValue.options[userSortValue.selectedIndex].value 

            return {
                ...state,
                sorting_value: action.payload,
            }

        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload;
            // console.log(value);
            // console.log(name);
            return {
                ...state,
                filters: {
                    ...state.filters,// when we selected one and more filters  
                    [name]: value, //and we can change filter value 
                }
            }


        case "SORTING_PRODUCTS":
            const { filtered_products, sorting_value } = state;
            let newSortData;
            let tempSortProduct = [...filtered_products] //we can use copy of data not original

            if (sorting_value === "selected_Value") {
                // console.log("hello");
                newSortData = [...filtered_products]; // we dont return because
                // we dont create a function.
            }


            if (sorting_value === "a_z") {
                //for sorting we will use compare function and a is first data and b is second data
                newSortData = tempSortProduct.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }

            if (sorting_value === "z_a") {
                newSortData = tempSortProduct.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            }


            if (sorting_value === "low_high") {
                newSortData = tempSortProduct.sort((a, b) => {
                    return a.price - b.price;
                });
            }

            if (sorting_value === "high_low") {
                newSortData = tempSortProduct.sort((a, b) => {
                    return b.price - a.price;
                });
            }
            // above if statements returns newSortData and we can add;
            return {
                ...state,
                filtered_products: newSortData,
            }



        case "FILTER_PRODUCT":
            let { all_products } = state;
            let tempFilterProduct = [...all_products];
            const { text, category, brand, color, rangePrice, } = state.filters;

            // console.log(color);

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    // console.log(curElem.name.toLowerCase().includes(text));
                    return curElem.name.toLowerCase().includes(text);
                });
            }

            if (category !== "All") {
                // console.log(category);
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    // console.log(category.toLowerCase());
                    return curElem.category.toLowerCase() === category.toLowerCase();
                });
            }


            if (brand !== "All") {

                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.brand.toLowerCase() === brand.toLowerCase();
                });

            }

            if (color !== "All") {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.colors.includes(color);
                });

            }

            if (rangePrice) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.price <= rangePrice;
                })

            }

            return {
                ...state,
                filtered_products: tempFilterProduct,
            }

        case "CLEAR_FILTERS":
            return {
                ...state,
                sorting_value: "",
                filters: {
                    ...state.filters,
                    text: "",
                    category: "All",
                    brand: "All",
                    color: "All",
                    rangePrice: state.filters.max_range_price,
                    max_range_price: state.filters.max_range_price,
                    min_range_price: state.filters.min_range_price,
                }
            }

        default:
            return { ...state }
    }
}

export default Filter_reducer;