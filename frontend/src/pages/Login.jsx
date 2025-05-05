import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login successful, token:", data.token);

        // ✅ Save token in localStorage
        localStorage.setItem("token", data.token);

        // ✅ Redirect to Prediction Page
        alert("✅ Login Successful! Redirecting to Prediction Page...");
        navigate("/predict");
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("❌ An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="glass bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
