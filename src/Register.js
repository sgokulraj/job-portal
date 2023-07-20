import "./Register.css";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, dbr } from "./firebase-config/firebase-config";
import { ref, set } from "firebase/database";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // const [info, setInfo] = useState(false);

  const password = useRef("");
  password.current = watch("password");

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const validation = {
    username: {
      required: {
        value: true,
        message: "Enter Username",
      },
    },
    phonenumber: {
      required: {
        value: true,
        message: "Enter Phonenumber",
      },
      pattern: {
        value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        message: "Enter valid phone number",
      },
    },
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
      minLength: {
        value: 6,
        message: "Your password should contain atleast 6 characters",
      },
    },
    confirm: {
      required: {
        value: true,
        message: "Confirm Password",
      },
      minLength: {
        value: 6,
        message: "Your password should contain atleast 6 characters",
      },
      validate: (value) => {
        if (value !== password.current) {
          return "The passwords doesn't match";
        }
      },
    },
  };

  const navigate = useNavigate();
  const [firebaseErr, setFirebaseErr] = useState("");

  // function refresh() {
  //   window.location.href = "./login";
  // }

  return (
    <section className="sec">
      <div className="main">
        <h2>Sign Up</h2>
        <form
          onSubmit={handleSubmit((data, e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, data.email, data.password)
              .then((userCredential) => {
                const user = userCredential.user.uid;
                set(ref(dbr, "users/" + user), data);
                alert("Registration successfull");
                setTimeout(() => {
                  navigate("/login");
                }, 500);
              })
              .catch((error) => {
                setFirebaseErr(error.message);
              });
          })}
        >
          <div className="input">
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              {...register("username", validation.username)}
            />
            <br />
            <p className="errormsg">
              {errors.username && errors.username.message}
            </p>
          </div>
          <div className="input">
            <label htmlFor="phonenumber">Phonenumber</label>
            <br />
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              placeholder="Enter Phone number"
              {...register("phonenumber", validation.phonenumber)}
            />
            <br />
            <p className="errormsg">
              {errors.phonenumber && errors.phonenumber.message}
            </p>
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter valid email"
              {...register("email", validation.email)}
            />
            <br />
            <p className="errormsg">{errors.email && errors.email.message}</p>
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              {...register("password", validation.password)}
            />
            <br />
            <p className="errormsg">
              {errors.password && errors.password.message}
            </p>
          </div>
          <div className="input">
            <label htmlFor="confirm">Confirm Password</label>
            <br />
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Confirm Password"
              {...register("confirm", validation.confirm)}
            />
            <br />
            <p className="errormsg">
              {errors.confirm && errors.confirm.message}
            </p>
            <br />
          </div>
          <p>{firebaseErr}</p>
          <div className="btnGroup">
            <div>
              <button type="submit" id="submitBtn" className="btns">
                Submit
              </button>
            </div>
            <div>
              <button type="reset" id="clearBtn" className="btns">
                Reset
              </button>
            </div>
          </div>
        </form>

        {/* // <div className="modal">
        //   <div className="userDetails">
        //     <p>Registered successfully</p>
        //     <button onClick={refresh} className="btns">
        //       Done
        //     </button>
        //   </div>
        // </div> */}
      </div>
    </section>
  );
}

export default Register;
