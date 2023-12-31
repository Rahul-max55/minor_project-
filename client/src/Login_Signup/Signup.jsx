import React, { useContext } from "react";
import "./Signup.css";
import { useFormik } from "formik";
import { SignupSchema } from "../validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Create_context } from "../Contexts/CreateContext";

const Signup = () => {
  const navigate = useNavigate();
  const context = useContext(Create_context);
  let { change_logSign } = context;

  const { handleChange, handleBlur, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        cpassword: "",
      },
      validationSchema: SignupSchema,
      onSubmit: async (values) => {
        console.log(values);
        try {
          console.log(values);
          const apiData = await axios.post(
            "http://localhost:3001/user/signup/",
            values
          );
          alert(apiData?.data?.msg);
          if (apiData?.data?.status) {
            change_logSign();
          }
        } catch (error) {
          console.log("🚀 ~ file: Signup.jsx:21 ~ Signup ~ error:", error);
        }
      },
    });

  return (
    <>
      {/* <!--Create Container for Signup form--> */}
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
    </>
  );
};

export default Signup;
