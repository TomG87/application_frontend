import "./App.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ApplicationIndex({ userId, token }) {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  // Function to fetch applications
  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/applications/user-applications/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [userId, token]);

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
      fetchApplications();
    } catch (error) {
      console.error("Error deleting the application:", error);
    }
  };

  return (
    <div>
      <div className="application-index-tile">
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="application-cards-container">
            {applications.map((application) => (
              <div key={application._id} className="application-card">
                <h2>{application.companyName}</h2>
                <p>Date: {application.date}</p>
                <p>Source: {application.source}</p>
                <p>
                  Link:{" "}
                  <a
                    href={application.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                <button onClick={() => handleEdit(application._id)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(application._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
