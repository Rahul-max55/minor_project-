import React from "react";
import { useFormik } from "formik";
import { SignupSchema } from "../../validation";
import { useNavigate } from "react-router-dom";
import { addUserAsync } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const change_logSign = () => {
    localStorage.getItem("login_signup")
      ? localStorage.setItem("login_signup", true)
      : localStorage.setItem("login_signup", false);
  };

  const { handleChange, handleBlur, handleSubmit, errors, values } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        dispatch(addUserAsync(values));
      } catch (error) {
        console.log("🚀 ~ file: Signup.jsx:21 ~ Signup ~ error:", error);
      }
    },
  });

  return (
    <>
      {/* <!--Create Container for Signup form--> */}
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
            <h1>Sign Up Form</h1>
            <div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="input-field"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && (
                <p className="signup_error">*{errors.username}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input-field"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && <p className="signup_error">*{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
              />
              {errors.password && (
                <p className="signup_error">*{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="cpassword"
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

            <button className="signup-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
