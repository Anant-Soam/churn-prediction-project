import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PredictionPage from "./pages/PredictionPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResultPage from "./pages/ResultPage";

// ✅ Function to check if user is authenticated
const isAuthenticated = () => !!localStorage.getItem("token");

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      {/* ✅ Show Navbar only if user is NOT on Login/Register */}
      {window.location.pathname !== "/login" && window.location.pathname !== "/register" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* ✅ Protect Prediction Page */}
        <Route path="/prediction" element={<ProtectedRoute><PredictionPage /></ProtectedRoute>} />
        <Route path="/predict" element={<ProtectedRoute><PredictionPage /></ProtectedRoute>} />

        {/* ✅ Protect Result Page */}
        <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* ✅ Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
