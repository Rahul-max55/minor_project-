import React, { useState , useEffect} from 'react'


// we destructur our img props and set default object inside without default value map gives error;
const Single_page_img = ({ imgs}) => {

//   The Optional Chaining Operator(?.) -
//         The?.operator returns undefined if an object is undefined or null(instead of throwing an error).

    // console.log(imgs);
    const [changeImg, setChangeImg] = useState();

    // We can use useEffect for getting a data using async and await method and set State when we get the data.
    useEffect(() => {
        const updateState =async () => {
            let data = await imgs?.[0];
            setChangeImg(data)
        }
        updateState();
    }, [imgs])
    // console.log(imgs);
    // console.log(changeImg.url);

    return (
        <div className="left">
            <div className="review_images">
                {
                    // if we get undifined and null we dont get any error because we use ?. this opratore
                 imgs?.map((value, index) =>{
                        return <img key={index} src={value.url} alt={value.filename} onClick={() => setChangeImg(value)} />
                    })
                }
                
            </div>
            <img src={changeImg?.url} alt={changeImg?.filename} id='main_img' />
        </div>
    )
}

export default Single_page_img;