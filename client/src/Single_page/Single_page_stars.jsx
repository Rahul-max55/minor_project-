import React from 'react';
import { FaStarHalf } from "react-icons/fa";
import { FaStar } from "react-icons/fa";


const Single_page_stars = (props) => {

    let starColor = { color: "rgb(17, 163, 173)" };

    return (
        <>

            {[...Array(5)].map((value, index) => {
                let halfNumber = index + 0.5;
                // alert(props.stars);
                return <span key={index} > {props.stars >= (index + 1) ? <FaStar style={starColor} /> : props.stars >= halfNumber ? <FaStarHalf style={starColor} /> : "" } 
                </span>
            })
            }
            ( Customer reviews)
        </>
    )
}

export default Single_page_stars