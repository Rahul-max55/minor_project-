import React, { useState } from 'react';
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
// import { TbIndentIncrease } from 'react-icons/tb';

const Single_page_quantity = ({ counter, increment, decrement }) => {

    // const [quantity, setQuantity] = useState(0);

    return (
        <>
            <AiFillMinusSquare onClick={() => { decrement() }} />
            <p>{counter}</p>
            <AiFillPlusSquare onClick={() => { increment()} } />
        </>
    )
}

export default Single_page_quantity