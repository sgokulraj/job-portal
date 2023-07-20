import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { auth } from "./firebase-config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoginSuccessful },
  } = useForm();

  useEffect(() => {
    reset();
  }, [isLoginSuccessful, reset]);

  const validation = {
    email: {
      required: {
        value: true,
        message: "Enter Email",
      },
      pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Enter valid Email address",
      },
    },
    password: {
      required: {
        value: true,
        message: "Enter Password",
      },
    },
  };
  const [firebaseErr, setFirebaseErr] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="mainContainer">
        <h2>Login</h2>
        <form
          onSubmit={handleSubmit((data, e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, data.email, data.password)
              .then((userCredential) => {
                const user = userCredential.user.uid;
                window.location.href = `./?ud=${user}`;
                alert("SignIn successfull");
                setTimeout(() => {
                  navigate("/login");
                }, 500);
              })
              .catch((error) => {
                setFirebaseErr(error.message);
              });
          })}
        >
          <div className="inputContainer">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Email"
              className="inputbox"
              {...register("email", validation.email)}
            />
            <br />
            <p className="errmsg">{errors.email && errors.email.message}</p>
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="inputbox"
              {...register("password", validation.password)}
            />
            <br />
            <p className="errmsg">
              {errors.password && errors.password.message}
            </p>
          </div>
          <p className="errmsg">{firebaseErr}</p>
          <div className="btnContainer">
            <div>
              <button type="submit" id="submit" className="btn">
                Submit
              </button>
            </div>
            <div>
              <button type="reset" id="clear" className="btn">
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
