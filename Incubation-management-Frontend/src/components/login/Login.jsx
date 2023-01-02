import React, { useState, useEffect, useContext } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserData } from "../../store/DbContext";

function Login() {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      axios
        .post("/api/user/login", {
          email: formValues.email,
          password: formValues.password,
        })
        .then((response) => {
          if (
            response.data === "User not found" ||
            response.data === "Please check your password" ||
            response.data === "You are blocked"
          ) {
            generateError(response.data);
          } else {
            navigate("/", { replace: true });
          }
        });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      const error = "This is not a valid email format!";
      generateError(error);
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="form w-25">
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
          <p>
            Already have an account ?<Link to="/signup"> Signup</Link>
          </p>
        </div>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Login;
