import React, { useContext, useState } from "react";
import "./Login_Signup.css";
import Signup from "./Signup";
import Login from "./Login";

const Login_Signup = (props) => {
  // For Login SignUp
  const [login_signup, setLogin_Signup] = useState(
    localStorage.getItem("login_signup")
  );
  // END Login SignUp

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
          {login_signup === "true" ? <Signup /> : <Login />}
        </div>
      </div>
    </>
  );
};

export default Login_Signup;
