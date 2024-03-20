import React, { useEffect } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../../validation";
import { PATHS } from "../../routes/paths";
import Cookies from "js-cookie";
import { loginUserAsync, user } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(user);
  console.log("🚀 ~ Login ~ userData:", userData);

  const { handleChange, handleBlur, handleSubmit, errors, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      dispatch(loginUserAsync(values));
    },
  });

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate(PATHS.dashboard);
    }
  }, [userData]);

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
            <NavLink to={PATHS.forgatepass}>Forgat Password</NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
