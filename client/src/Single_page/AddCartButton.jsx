import React from 'react';
import { useContext , useState } from 'react';
import { NavLink } from 'react-router-dom';
import {CartCreateContext} from '../Add_Cart/Cart_Context/Cart_Create_Context';

const AddCartButton = ({ singlePageData, colorCheck, counter }) => {

    let context = useContext(CartCreateContext);
    const { addCart } = context;

    // const { id, colors, stock } = singlePageData;

    // const [colorData, setColorData] = useState(colors?.[0]);
    // const [amount, setAmount] = useState(2);



    return (
        <>
        <NavLink to="/Add_to_cart">
                <button className='Add_cart_btn' onClick={() => addCart(singlePageData, colorCheck, counter )} >Add to Cart</button>
        </NavLink>
        </>
    )
}

export default AddCartButton