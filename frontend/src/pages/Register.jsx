import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "Male",
    company: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post("http://localhost:5000/register", formData);

      setMessage("✅ Registration successful! Redirecting to login...");

      // ✅ Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage("❌ User already exists!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="glass w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-white text-center mb-4">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none"
          >
            <option value="Male" className="bg-gray-800">Male</option>
            <option value="Female" className="bg-gray-800">Female</option>
            <option value="Other" className="bg-gray-800">Other</option>
          </select>
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        {message && <p className="text-center text-white mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
