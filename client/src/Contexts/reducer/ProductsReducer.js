// import React from 'react'

// multiple condition inside the function and check the value of disptch and run the code
const ProductsReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
            }
        // After the returns execution of program is stoped so we can't use break;
        case "SET_API_DATA":
            const featureData = action.payload.filter((value) => {
                return value.featured === true; //do-not use double-quates because api only contains true not containing "true".
            })
            
            return {
                ...state,
                isLoading: "false",
                products: action.payload,
                featureProducts: featureData,
            }
        case "API_ERROR":
            return {
                ...state,
                isError: true,
            }
        case "IS_SINGLE_LOADING":
            return {
                ...state,
                singleLoading: true,
            }
        case "SET_SINGLE_PRODUCT":
            return {
                ...state,
                singleLoading: false,
                singlePageData: action.payload,
            }
        case "IS_SINGLE_ERROR":
            return {
                ...state,
                singleLoading: false,
                singleError: true,
            }

        default:
            return state;  //this state is importent so pass this at last
    }
   
}

export default ProductsReducer