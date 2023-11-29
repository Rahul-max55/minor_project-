import React, { useState, useEffect, useReducer } from "react";
import { Create_context } from "./CreateContext";
import axios from "axios";
import reducer from "./reducer/ProductsReducer";

// Api link always call outside function
// const API = "https://api.pujakaitem.com/api/products";
// const API = "https://fakestoreapi.com/products";
const API = "http://localhost:3001/user/products/";

const NoteContext = (props) => {

    // For Login SignUp
    const [login_signup, setLogin_Signup] = useState("false");
    const change_logSign = () => {
        login_signup === "false" ? setLogin_Signup("true") : setLogin_Signup("false");
    };
    // END Login SignUp

    // we can send initialData into reducer state
    const initialState = {
        isLoading: false,
        isError: false,
        products: [],
        featureProducts: [],
        singleLoading:false,
        singlePageData: {},
        singleError : false,
    }

    // Create Reducer and useReducer takes two parameter reducer and initialState.
    // initialState is defined and reducer is define another file and import it.
    const [state, dispatch] = useReducer(reducer, initialState);


    // useEffect function runs here and load api data in products variables
    const getProducts = async (url) => {
        // dispatch methods tell us what can work in action method and action method is define in reducer file.
        // According to the dispatch type, reducer differentiate what can be he executes. 
        dispatch({ type: "SET_LOADING" })
        try {
            const res = await axios.get(url);
            const products = await res.data;
            // console.log(products);
            dispatch({ type: "SET_API_DATA", payload: products });
        } catch (error) {
            dispatch({ type: "API_ERROR" })
        }
    }

    // Using effect we can call the api help of axios
    useEffect(() => {
        getProducts(API);
    }, [])

    // SinglePage function creation for featching data
    const [colorCheck, setColorCheck] = useState();


    const singleProduct = async (Single_page_url) => {
        dispatch({ type: "IS_SINGLE_LOADING" })
        try {
            const res = await axios.get(Single_page_url);
            const singlePageProduct = await res.data;
            // console.log(singlePageProduct);
            dispatch({ type: "SET_SINGLE_PRODUCT", payload: singlePageProduct })
        } catch (error) {
            dispatch({type:"IS_SINGLE_ERROR"})
        }
    }


    return (
        <>
            {/* we can send our reducer data ...state using provider */}
            <Create_context.Provider value={{ login_signup, change_logSign, colorCheck,setColorCheck, ...state, singleProduct }}>
                {props.children}
            </Create_context.Provider>
        </>
    )
}

export default NoteContext;
// export { Create_context };