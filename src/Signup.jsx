import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/register.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <br></br>
      <h1>Signup</h1>
      <ul></ul>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="name">Name:</label>
          <input name="name" type="text" />
        </div>
        <div className="row">
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" />
        </div>
        <div className="row">
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
