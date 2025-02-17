import axios from "axios";
import React from "react";
import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PiUserCircleDuotone } from "react-icons/pi";

export function Login() {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [unsuccessful, setUnsuccessful] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    setSuccessMessage("");
    setUnsuccessful("");

    const params = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    console.log("Params:", params);
    axios
      .post("http://localhost:3000/api/users/login", params)
      .then((response) => {
        console.log("Login response:", response);
        event.target.reset();
        setSuccessMessage("You have successfully logged in!");

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        setTimeout(() => {
          window.location.href = "/applications/create";
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response?.data?.errors || error.message);
        setErrors(error.response?.data?.errors || []);
        setUnsuccessful(
          "The credentials you entered do not match our records."
        );
      });
  };

  return (
    <div id="login">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 className="login-title">Login</h1>
      <br></br>
      <br></br>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {unsuccessful && <p className="unsuccessful-message">{unsuccessful}</p>}

      <ul>
        {errors.map((error, index) => (
          <li key={index} className="error-message">
            {error}
          </li>
        ))}
      </ul>

      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input name="password" type="password" />
        </div>
        <button className="submit">Login</button>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="register-link">
        <Link to="/register">
          <PiUserCircleDuotone className="action-icon" /> Signup
        </Link>
      </div>
    </div>
  );
}
