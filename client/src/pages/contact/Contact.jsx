import React from "react";
import { useState } from "react";
import "./Contact.css";


const Contact = () => {

    const [formValue, setFormValue] = useState({
        name: "",
        subject: "",
        query: "",
    });
    
    const handleChange = (event) => {
        let { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
    }
    
 
    return (
        <>
            <div className="contact_container">
                <div className="map">

                    <iframe title="mapforIndia" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d23963548.478338074!2d70.79204092619355!3d22.520382745609314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1667212903021!5m2!1sen!2sin" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="form_query">
                    <h2>Query Form</h2>
                    <form method="Post" id="from_field" >
                        <input type="text" name="name" className="input" placeholder="Enter Your Name" value={formValue.name} onChange={handleChange} />
                        <input type="text" value={formValue.subject} name="subject" className="input" placeholder="Add query subject" onChange={handleChange} />
                        <textarea name="query" value={formValue.query} className="input" id="details" cols="30" rows="10" placeholder="Enter your Query" onChange={handleChange} ></textarea>
                        <input type="submit"  className="input" value="Submit Query" />
                    </form>
                </div>
            </div>
        </>
    )
}


export default Contact;