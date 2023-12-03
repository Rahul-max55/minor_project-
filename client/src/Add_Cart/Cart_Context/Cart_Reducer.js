
const Cart_Reducer = (state, action) => {

    if (action.type === "ADD_TO_CART") {
        const { data  } = action.payload;
        const { name, id, price, stock, image, colorCheck , counter } = data;
        console.log("🚀 ~ file: Cart_Reducer.js:7 ~ colorCheck:", colorCheck)
        console.log("🚀 ~ file: Cart_Reducer.js:7 ~ counter:", counter)

        let existingProduct = state.cart.find((value) => value.id === id + colorCheck);
        // console.log(singlePageData);
        let newAmout = price * counter;

        if (existingProduct) {
            let updatedProdcut = state.cart.map((curElem) => {
                if (curElem.id === id + colorCheck) {
                    let newAmout = curElem.orderQuantity + counter;
                    if (newAmout > curElem.max) {
                        newAmout = curElem.max;
                    }
                    let totalFinalProductPrice = curElem.price * newAmout;
                    return {
                        ...curElem,
                        orderQuantity: newAmout,
                        FinalProductPrice: totalFinalProductPrice,
                    }
                }
                else {
                    return curElem;
                }
            })
            return {
                ...state,
                cart: updatedProdcut,
            }

        } else {
            let cartProduct;
            cartProduct = {
                name: name,
                id: id + colorCheck,
                color: colorCheck,
                max: stock,
                image: image?.[0].url,
                price: price,
                orderQuantity: counter,
                FinalProductPrice: newAmout,
            }
            return {
                ...state,
                cart: [...state.cart, cartProduct],
            }
        }
    }

    if (action.type === "TOTAL_ITEMS") {
        const {grandCartTotal } = action.payload;
        return {
            ...state,
            // total_item: totalProduct,
            grandTotal: grandCartTotal,
        }
    }

    if (action.type === "REMOVE_ITEMS") {
        let remainElemCart = state.cart.filter((value) => {
            return action.payload !== value.id;
        })
        return {
            ...state,
            cart: remainElemCart,
        }
    }

    if (action.type === "CLEAR_ALL_CART") {
        return {
            ...state,
            cart: [],
        }
    }

    if (action.type === "INCREMENT_DECREMENT_CART") {
        const { value, id } = action.payload;
        let UpdatedQuantity = state.cart.map((curElem) => {
            if (curElem.id === id) {
                let newVal = value + curElem.orderQuantity;

                if (curElem.max >= newVal && newVal > 0) {
                    return {
                        ...curElem,
                        orderQuantity: newVal,
                        FinalProductPrice: newVal * curElem.price,
                    }
                } else {
                    return {
                        ...curElem
                    }
                }
            } else {
                return {
                    ...curElem
                }
            }

        })

        return {
            ...state,
            cart: UpdatedQuantity
        }
    }

    return state;


}

export default Cart_Reducer