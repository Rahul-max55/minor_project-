import { useFormik } from "formik";
import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { passwordreset } from "../validation";
import styles from "./forgatepass.module.css";
import axios from "axios";
import { PATHS } from "../routes/paths";
import FETCH_WRAPPER from "../Api";

const Password_reset = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const { handleChange, handleBlur, handleSubmit, errors, values } = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: passwordreset,
    onSubmit: async (values) => {
      console.log(token)
      try {
        const apiData = await FETCH_WRAPPER.post(`resetpassword/${token}`,
          {...values}
        );

        console.log("🚀 ~ file: Password_reset.jsx:26 ~ onSubmit: ~ apiData:", apiData)

        if (!apiData?.data?.status) {
         return alert(apiData?.data?.msg);
        }

        alert(apiData?.data?.msg);
        navigate(PATHS.login_signup);

      } catch (error) {
        console.log(
          "🚀 ~ file: Password_reset.jsx:29 ~ onSubmit: ~ error:",
          error
        );
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
            <h1>Reset Password</h1>
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
              {errors.password && (
                <p className="signup_error">*{errors.password}</p>
              )}
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
              {errors.cpassword && (
                <p className="signup_error">*{errors.cpassword}</p>
              )}
            </div>
            <div className={styles.forgatepass}>
              <NavLink to={PATHS.forgatepass}>Back</NavLink>
              <button type="submit">Next</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Password_reset;
