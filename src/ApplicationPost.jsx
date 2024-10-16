import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function ApplicationPost({ userId, token }) {
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [unsuccessful, setUnsuccessful] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
    } else {
      navigate("/applications/create");
    }
  }, [navigate, userId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");

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

    const interview = {
      date: event.target.interviewDate.value || null,
      time: event.target.interviewTime.value || null,
      location: event.target.interviewLocation.value || "",
    };

    formData.append("interview", JSON.stringify(interview));
    formData.append("notes", event.target.notes.value);

    const file = event.target.document.files[0];
    if (file) {
      formData.append("document", file);
    }

    formData.append("user", userId);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/applications/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      event.target.reset();
      setMessage("Application has been successfully added.");
      setTimeout(() => {
        window.location.href = "/applications";
      }, 2000);
      setUnsuccessful("");
      setErrors([]);
    } catch (error) {
      console.error("Error response:", error.response);
      const errorMessage = error.response?.data?.errors || error.message;

      setErrors(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);

      setUnsuccessful(
        "There was a problem adding your application. Please try again."
      );
      setMessage("");
    }

    console.log("Form Values:", {
      date: event.target.date.value,
      companyName: event.target.companyName.value,
      source: event.target.source.value,
      applicationLink: event.target.applicationLink.value,
      remote: event.target.remote.checked,
      state: event.target.state.value,
      response: event.target.response.checked,
      interview,
      notes: event.target.notes.value,
      attachment: event.target.attachment.files[0],
      user: userId,
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
          <input id="date" name="date" type="date" />
        </div>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input id="companyName" name="companyName" type="text" />
        </div>
        <div>
          <label htmlFor="source">Source:</label>
          <input id="source" name="source" type="text" />
        </div>
        <div>
          <label htmlFor="applicationLink">Application Link:</label>
          <input
            id="applicationLink"
            name="applicationLink"
            type="url"
            pattern="https?://.*"
          />
        </div>
        <div>
          <label htmlFor="remote">Remote:</label>
          <input id="remote" name="remote" type="checkbox" />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input id="state" name="state" type="text" />
        </div>
        <div>
          <label htmlFor="response">Response:</label>
          <input id="response" name="response" type="checkbox" />
        </div>
        <div>
          <label htmlFor="interviewDate">Interview Date:</label>
          <input id="interviewDate" name="interviewDate" type="date" />
        </div>
        <div>
          <label htmlFor="interviewTime">Interview Time:</label>
          <input id="interviewTime" name="interviewTime" type="time" />
        </div>
        <div>
          <label htmlFor="interviewLocation">Interview Location:</label>
          <input id="interviewLocation" name="interviewLocation" type="text" />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea id="notes" name="notes"></textarea>
        </div>
        <div>
          <label htmlFor="attachment">Attachment:</label>
          <input id="attachment" name="document" type="file" />
        </div>
        <button className="submit">Submit</button>
      </form>
      <br></br>
      <div className="applicationpost-link">
        <Link to="/applications">Click here to view all your Applications</Link>{" "}
      </div>
    </div>
  );
}

export default ApplicationPost;
