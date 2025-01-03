import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ApplicationEdit({ userId, token }) {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
    } else {
      const fetchApplication = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/applications/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setApplication(response.data);
        } catch (error) {
          console.error("Error fetching application:", error);
          setErrors(["Failed to fetch application details."]);
        }
      };

      fetchApplication();
    }
  }, [navigate, userId, token, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("date", event.target.date.value);
    formData.append("companyName", event.target.companyName.value);
    formData.append("source", event.target.source.value);
    formData.append("applicationLink", event.target.applicationLink.value);
    formData.append("remote", event.target.remote.checked);
    formData.append("state", event.target.state.value);
    formData.append("response", event.target.response.checked);
    formData.append("notes", event.target.notes.value);
    formData.append("user", userId);

    const file = event.target.document.files[0];
    if (file) {
      formData.append("document", file);
    }

    try {
      await axios.put(
        `http://localhost:3000/api/applications/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/applications");
    } catch (error) {
      console.error("Error updating application:", error);
      const errorMessage = error.response?.data?.errors || error.message;
      setErrors(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
    }
  };

  if (!application) return <p>Loading...</p>;

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 className="edit-title">Edit Application</h1>
      <br></br>
      <br></br>
      <br></br>
      <div className="application-edit-tile">
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index} className="error-message">
                {error}
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={application.date}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="companyName">Company Name:</label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              defaultValue={application.companyName}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="source">Source:</label>
            <input
              id="source"
              name="source"
              type="text"
              defaultValue={application.source}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="applicationLink">Application Link:</label>
            <input
              id="applicationLink"
              name="applicationLink"
              type="url"
              pattern="https?://.*"
              defaultValue={application.applicationLink}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="remote">Remote:</label>
            <input
              id="remote"
              name="remote"
              type="checkbox"
              defaultChecked={application.remote}
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="state">State:</label>
            <input
              id="state"
              name="state"
              type="text"
              defaultValue={application.state}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="response">Response:</label>
            <input
              id="response"
              name="response"
              type="checkbox"
              defaultChecked={application.response}
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              defaultValue={application.notes}
            ></textarea>
          </div>
          <br></br>
          <div>
            <label htmlFor="attachment">Attachment:</label>
            <br></br>
            <br></br>
            <input id="attachment" name="document" type="file" />
          </div>
          <br></br>
          <button type="submit">Update Application</button>
        </form>
      </div>
    </div>
  );
}
