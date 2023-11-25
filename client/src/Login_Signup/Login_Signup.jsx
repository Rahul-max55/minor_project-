import React, { useContext } from "react";
import "./Login_Signup.css";
import Sign_Img from "./img/signUp.PNG";
import Signup from "./Signup";
import Login from "./Login";
import { Create_context } from "../Contexts/CreateContext";
// import { Create_context } from "../Contexts/NoteContext";

const Login_Signup = (props) => {
  const context = useContext(Create_context);
  const { login_signup } = context;

  return (
    <>
      <div className="signup_container">
        {/* <!--Forms--> */}
        {/* <!--Data or Content--> */}
        <div className="box-1">
          <div className="content-holder">
            <h2>Welcome Back</h2>
            <p className="button-1">
              Thank You for using our services
            </p>
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
