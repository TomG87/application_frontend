import axios from "axios";
import "./App.css";
import { useState } from "react";

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
        event.target.reset();
        setSuccessMessage("You have successfully logged in!");

        localStorage.setItem("token", response.data.token);
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
      <br />
      <h1 className="login-title">Login</h1>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {unsuccessful && <p className="unsuccessful-message">{unsuccessful}</p>}

      <ul>
        {errors.map((error, index) => (
          <li key={index} className="error-message">
            {error}
          </li>
        ))}
      </ul>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" />
        </div>
        <button className="submit">Login</button>
      </form>
    </div>
  );
}
