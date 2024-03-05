import React, { useContext } from "react";
import "./Login.css";
import { NavLink, useNavigate, useDispatch } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../../validation";
import { PATHS } from "../../routes/paths";
import Cookies from "js-cookie";
import FETCH_WRAPPER from "../../Api";
import { CreateContext } from "../../Contexts/CreateContext";

const Login = (props) => {
  const navigate = useNavigate();

  const { handleChange, handleBlur, handleSubmit, errors, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const apiData = await FETCH_WRAPPER.post("login", values);

        if (!apiData?.data?.token) {
          console.log(
            "🚀 ~ file: Login.jsx:23 ~ onSubmit: ~ !apiData?.data?.token: token is not created",
            !apiData?.data?.token
          );
        }
        alert(apiData?.data?.msg);
        if (apiData?.data?.status) {
          Cookies.set("token", apiData?.data?.token);
          const userJsonData = JSON.stringify(apiData?.data?.data?.[0]);
          console.log(
            "🚀 ~ file: Login.jsx:34 ~ onSubmit: ~ userJsonData:",
            userJsonData
          );
          localStorage.setItem("user", userJsonData);
          navigate(PATHS.root);
        }
      } catch (error) {
        console.log("🚀 ~ file: Login.jsx:22 ~ onSubmit: ~ error:", error);
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
          <form className="login-form-container" onSubmit={handleSubmit}>
            <h1>Login Form</h1>
            <div>
              <input
                type="text"
                name="email"
                onBlur={handleBlur}
                placeholder="Email"
                className="input-field"
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && <p className="signup_error">*{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                onBlur={handleBlur}
                placeholder="Password"
                className="input-field"
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && (
                <p className="signup_error">*{errors.password}</p>
              )}
            </div>

            <button className="login-button" type="submit">
              Login
            </button>
            <NavLink to={PATHS.forgatepass}>Forgate Password</NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
