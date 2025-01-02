import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./Footer";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { ApplicationPost } from "./ApplicationPost";
import ApplicationIndex from "./ApplicationIndex";
import ApplicationEdit from "./ApplicationEdit";
import React, { useEffect, useState } from "react";
import logo from "./images/application-trackstar-high-resolution-logo.png";

function App() {
  const [applications, setApplications] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/applications/user-applications/${userId}`,
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
        setApplications(applicationsData);
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
        <div className="app-background">
          <div className="app-logo">
            <img src={logo} alt="Application TrackStar Logo" className="logo" />
            <Routes>
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/applications"
                element={
                  <ApplicationIndex
                    applications={applications}
                    userId={userId}
                    token={token}
                  />
                }
              />
              <Route
                path="/applications/create"
                element={<ApplicationPost userId={userId} token={token} />}
              />
              <Route
                path="/applications/edit/:id"
                element={<ApplicationEdit userId={userId} token={token} />}
              />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
