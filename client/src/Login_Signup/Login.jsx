import React, { useState } from "react";
import "./Login.css";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../validation";
import axios from "axios";
import { PATHS } from "../routes/paths";

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
        const apiData = await axios.post(
          "http://localhost:3001/user/login/",
          values
        );

        if (!apiData?.data?.token) {
          console.log("🚀 ~ file: Login.jsx:23 ~ onSubmit: ~ !apiData?.data?.token: token is not created", !apiData?.data?.token)
        }
        alert(apiData?.data?.msg);
        
        if(apiData?.data?.status){
          localStorage.setItem("token", apiData?.data?.token);
          navigate(PATHS.root);
        }
      } catch (error) {
        console.log("🚀 ~ file: Login.jsx:22 ~ onSubmit: ~ error:", error);
      }
    },
  });

  return (
    <>
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
    </>
  );
};

export default Login;
