import axios from "axios";
import "./App.css";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    setSuccessMessage("");
    const params = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post("http://localhost:3000/api/users/register", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        setSuccessMessage("Your account has been successfully created!");
        // window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error.response?.data?.errors || error.message);
        setErrors(error.response?.data?.errors || []);
      });
  };

  return (
    <div id="signup">
      <br></br>
      <h1 className="signup-title">Signup</h1>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <ul>
        {errors.map((error, index) => (
          <li key={index} className="error-message">
            {error}
          </li>
        ))}
      </ul>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" />
        </div>
        <button className="submit">Submit</button>
      </form>
    </div>
  );
}
