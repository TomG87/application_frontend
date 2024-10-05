import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./Footer";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { ApplicationPost } from "./ApplicationPost";
import ApplicationIndex from "./ApplicationIndex";
import React, { useEffect, useState } from "react";

function App() {
  const [applications, setApplications] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/applications/user-applications/${userId}`, // Fetch user-specific applications
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch applications: ${response.statusText}`
          );
        }

        const applicationsData = await response.json();
        setApplications(applicationsData); // Set the fetched applications in the state
      } catch (error) {
        console.error(error);
      }
    };

    if (userId && token) {
      fetchApplications();
    }
  }, [userId, token]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/applications/create" element={<ApplicationPost />} />
        </Routes>
        <ApplicationIndex applications={applications} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
