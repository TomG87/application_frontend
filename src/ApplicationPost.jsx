import axios from "axios";
import { useState } from "react";
import "./App.css";

export function ApplicationPost() {
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [unsuccessful, setUnsuccessful] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setErrors(["User ID is required to submit the form."]);
      setUnsuccessful("User ID is required to submit the form.");
      return;
    }
    if (!userId) {
      setErrors(["User ID is required to submit the form."]);
      setUnsuccessful("User ID is required to submit the form.");
      return;
    }

    const formData = new FormData();
    formData.append("date", event.target.date.value);
    formData.append("companyName", event.target.companyName.value);
    formData.append("source", event.target.source.value);
    formData.append("applicationLink", event.target.applicationLink.value);
    formData.append("remote", event.target.remote.checked);
    formData.append("state", event.target.state.value);
    formData.append("response", event.target.response.checked);
    formData.append("interviewDate", event.target.interviewDate.value);
    formData.append("interviewTime", event.target.interviewTime.value);
    formData.append("interviewLocation", event.target.interviewLocation.value);
    formData.append("notes", event.target.notes.value);

    const file = event.target.attachment.files[0];
    if (file) {
      formData.append("attachment", file);
    }

    formData.append("user", userId);

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:3000/api/applications/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        event.target.reset();
        setMessage("Application has been successfully added.");
        setUnsuccessful("");
        setErrors([]);
      })
      .catch((error) => {
        console.log(error.response?.data?.errors || error.message);
        setErrors(error.response?.data?.errors || []);
        setUnsuccessful(
          "There was a problem adding your application. Please try again."
        );
        setMessage("");
      });
  };

  return (
    <div id="application-add">
      <h1 className="application-title">Add Application</h1>

      {message && <p className="success-message">{message}</p>}
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
          <label htmlFor="date">Date:</label>
          <input name="date" type="date" />
        </div>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input name="companyName" type="text" />
        </div>
        <div>
          <label htmlFor="source">Source:</label>
          <input name="source" type="text" />
        </div>
        <div>
          <label htmlFor="applicationLink">Application Link:</label>
          <input name="applicationLink" type="url" pattern="https?://.*" />
        </div>
        <div>
          <label htmlFor="remote">Remote:</label>
          <input name="remote" type="checkbox" />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input name="state" type="text" />
        </div>
        <div>
          <label htmlFor="response">Response:</label>
          <input name="response" type="checkbox" />
        </div>
        <div>
          <label htmlFor="interviewDate">Interview Date:</label>
          <input name="interviewDate" type="date" />
        </div>
        <div>
          <label htmlFor="interviewTime">Interview Time:</label>
          <input name="interviewTime" type="time" />
        </div>
        <div>
          <label htmlFor="interviewLocation">Interview Location:</label>
          <input name="interviewLocation" type="text" />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea name="notes"></textarea>
        </div>
        <div>
          <label htmlFor="attachment">Attachment:</label>
          <input name="attachment" type="file" />
        </div>
        <button className="submit">Submit</button>
      </form>
    </div>
  );
}

export default ApplicationPost;
