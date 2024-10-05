import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./Footer";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { ApplicationPost } from "./ApplicationPost";

function App() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/api/users/register" element={<Signup />} />
          <Route path="/api/users/login" element={<Login />} />
          <Route
            path="/api/applications/create"
            element={<ApplicationPost userId={userId} token={token} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
