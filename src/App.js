import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./Footer";
import { Signup } from "./Signup";
import { Login } from "./Login";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/api/users/register" element={<Signup />} />
          <Route path="/api/users/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
