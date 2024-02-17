import React, { useState , useEffect } from 'react'
import { BsCheckAll } from "react-icons/bs";


const Single_page_colors = ({ Product, colorCheck, setColorCheck }) => {

    const { id, colors } = Product;

    // console.log(colors?.[0]);
    // const [colorProduct, setColorProduct] = useState();

    // const [colorCheck, setColorCheck] = useState();

    // firstly color value is undefine so we can use useEffect when color value is updates setting the our color value.

    useEffect(() => {
        setColorCheck(colors?.[0])
    }, [colors])


    return (
        <>
            <h4>Color : </h4>
            {/* <div className="Single_color" style={{ backgroundColor: "#000000" }}></div> */}
            {colors?.map((values, index) => {
                // console.log(value);
                return <button
                    key={index}
                    className={colorCheck === values ? "Single_color Active" : "Single_color"}
                    style={{ backgroundColor: values }}
                    onClick={() => setColorCheck(values)} >
                    {colorCheck === values ? <BsCheckAll style={{ color: "white" }} /> : null}
                </button>
            })}
        </>
    )
}

export default Single_page_colors;