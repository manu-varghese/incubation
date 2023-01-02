import React, { useState, useEffect } from "react";
import "./Signup.css";
import axios from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, createBrowserRouter, Link } from "react-router-dom";

function Signup() {
  let navigate = useNavigate();
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      axios
        .post("/api/user/register", {
          email: formValues.email,
          password: formValues.password,
          name: formValues.username,
        })
        .then((response) => {
          if (response.data === "Email already present") {
            const error = response.data;
            generateError(error)
          } else {
            navigate("/login");
          }
        });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      const errors = "Username is required!";
      generateError(errors)
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
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
        <h1>SignUp Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
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
            Already have an account ?<Link to="/login"> Login</Link>
          </p>
        </div>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Signup;
