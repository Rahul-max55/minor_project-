import React, { useReducer, useEffect, useContext } from 'react';
import { FilterCreateContext } from "./FCreateContext";
import { Create_context } from '../Contexts/CreateContext';
import FilterReducer from './FilterReducerF/Filter_reducer';

const FilterNoteContext = (props) => {

    const Fcontext = useContext(Create_context);
    const { products } = Fcontext;

    // all-products data we can use in filter section
    const InitialState = {
        filtered_products: [],
        all_products: [],
        sorting_value: "",
        filters: {
            text: "",
            category: "All",
            brand: "All",
            color: "All",
            rangePrice: "",
            max_range_price: "",
            min_range_price: "",
        },
    }

    // console.log(products);

    const [state, dispatch] = useReducer(FilterReducer, InitialState);

    // console.log(state);

    // use useEffect to loads a products
    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products })
    }, [products])

    // This function only gets a *value* in *option* filed we will store option value in reducer we also use useContext and store the value
    const sorting = (e) => {
        let click_data = e.target.value; // using target we  will getting value in option filled.
        dispatch({ type: "GET_SORT_VALUE", payload: click_data });
    }

    // this use Effect runs when [state.sorting_value] is updates;
    // when we merge below two useEffect generates errors -
    useEffect(() => {
        dispatch({ type: "SORTING_PRODUCTS" });
    }, [state.sorting_value])

    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCT" })
    }, [state.filters])


    // useEffect(() => {
    // }, [state.filters])


    //Function for searching value
    const updateFilterValue = (event) => {
        // event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        // console.log(value);
        // console.log(name);
        // console.log(value);
        dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
    }

    // We need Unique data for Filter section


    // Clear our filter 

    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" })
    }



    return (
        <>
            <FilterCreateContext.Provider value={{ ...state, sorting, updateFilterValue, clearFilters }}>
                {props.children}
            </FilterCreateContext.Provider>
        </>
    )
}

export default FilterNoteContext;
// export { FilterCreateContext };