import { useFormik } from "formik";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { emailForgate } from "../../validation";
import styles from "./forgatepass.module.css";
import axios from "axios";
import { PATHS } from "../../routes/paths";
import emailjs from "@emailjs/browser";
import FETCH_WRAPPER from "../../Api";

const Forgatepass = () => {
  const navigate = useNavigate();

  const { handleChange, handleBlur, handleSubmit, errors, values } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailForgate,
    onSubmit: async (values) => {
      try {
        const apiData = await FETCH_WRAPPER.post("email_valid",
          values
        );
        console.log(
          "🚀 ~ file: Forgatepass.jsx:24 ~ onSubmit: ~ apiData:",
          apiData?.data
        );

        const templateParams = {
          user_email: apiData?.data?.email,
          subject: "SHOPCENTER Forgate password",
          name: apiData?.data?.email,
          message: `click on this link and forgate your password link-> http://localhost:3000/resetpassword/${apiData?.data?.mailLink}`,
        };

        if (!apiData?.data?.status) {
          return alert(apiData?.data?.msg);
        }

        alert(apiData?.data?.msg);

        emailjs
          .send(
            "service_7rc752a",
            "template_288nhy1",
            templateParams,
            "LNtinvAM9sLrjV2gO"
          )
          .then(
            (result) => {
              alert(apiData?.data?.msg);
            },
            (error) => {
              console.log(error.text);
            }
          );
        // navigate(PATHS.password_reset);
      } catch (error) {
        console.log(
          "🚀 ~ file: Forgatepass.jsx:45 ~ onSubmit: ~ error:",
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
            <h1>Forgate Password</h1>
            <div>
              <input
                name="email"
                type="text"
                placeholder="email"
                className="input-field"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && <p className="signup_error">*{errors.email}</p>}
            </div>

            <div className={styles.forgatepass}>
              <NavLink to={PATHS.login_signup}>Back</NavLink>
              <button type="submit">Next</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgatepass;
