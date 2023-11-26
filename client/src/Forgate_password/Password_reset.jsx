import { useFormik } from "formik";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { emailForgate, passwordreset } from "../validation";
import styles from "./forgatepass.module.css";
import axios from "axios";
import { PATHS } from "../routes/paths";

const Password_reset = () => {
  const navigate = useNavigate();

  const { handleChange, handleBlur, handleSubmit, errors, values } = useFormik({
    initialValues: {
      password: "",
      cpassword:""
    },
    validationSchema: passwordreset,
    onSubmit: async (values) => {
      try {
        const apiData = await axios.post(
          "http://localhost:3001/user/forgate/",
          values
        );
        alert(apiData?.data?.msg);
        if (apiData?.data?.status) {
          navigate("/password");
        }
      } catch (error) {
        console.log("🚀 ~ file: Password_reset.jsx:29 ~ onSubmit: ~ error:", error)
      }
    },
  });

  return (
    <>
      <div className="signup_container">
        {/* <!--Forms--> */}
        {/* <!--Data or Content--> */}
        <div className="box-1">
          <div className="content-holder">
            <h2>Welcome Back</h2>
            <p className="button-1">Thank You for using our services</p>
          </div>
        </div>
        <div className="box-2">
          <form onSubmit={handleSubmit} className="signup-form-container">
            <h1>Forgate Password</h1>
            <div>
              <input
                name="password"
                type="text"
                placeholder="Password"
                className="input-field"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && <p className="signup_error">*{errors.password}</p>}
            </div>
            <div>
              <input
                name="cpassword"
                type="text"
                placeholder="Confirm Password"
                className="input-field"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cpassword}
              />
              {errors.password && <p className="signup_error">*{errors.password}</p>}
            </div>
            <div className={styles.forgatepass}>
              <NavLink to={PATHS.forgatepass} >Back</NavLink>
              <button type="submit" >Next</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Password_reset;
