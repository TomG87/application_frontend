import "./App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ApplicationIndex({ applications, userId, token }) {
  const navigate = useNavigate();

  const handleEdit = (applicationId) => {
    console.log("Navigating to edit application with ID:", applicationId);
    navigate(`/applications/edit/${applicationId}`);
  };

  const handleDelete = async (applicationId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/applications/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting the application:", error);
    }
  };

  return (
    <div>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {applications.map((application) => (
            <li key={application._id}>
              <h2>{application.companyName}</h2>
              <p>Date: {application.date}</p>
              <p>Source: {application.source}</p>
              <p>
                Link:{" "}
                <a href={application.applicationLink}>
                  {application.applicationLink}
                </a>
              </p>
              <p>Remote: {application.remote ? "Yes" : "No"}</p>
              <p>State: {application.state}</p>
              <p>Response: {application.response ? "Yes" : "No"}</p>
              <div>
                <h4>Interview Details</h4>
                <p>Date: {application.interview?.date || "N/A"}</p>
                <p>Time: {application.interview?.time || "N/A"}</p>
                <p>Location: {application.interview?.location || "N/A"}</p>
              </div>
              <p>Notes: {application.notes}</p>
              {application.document && (
                <div>
                  <h4>Attached Document:</h4>
                  <a
                    href={`/${application.document.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {application.document.fileName}
                  </a>
                </div>
              )}
              {/* Edit and Delete Buttons */}
              <button onClick={() => handleEdit(application._id)}>Edit</button>
              <button onClick={() => handleDelete(application._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
