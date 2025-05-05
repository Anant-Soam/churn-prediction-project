import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PredictionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    tenure: "",
    monthlyCharges: "",
    contract: "",
  });

  const [loading, setLoading] = useState(false); // ✅ Add loading state

  // ✅ Ensure user is authenticated before allowing access
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠ Access denied! Please log in first.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    setLoading(true); // ✅ Start loading

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Ensure token is sent
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch prediction");
      }

      const data = await response.json();
      console.log("✅ Prediction Received:", data.prediction);

      // ✅ Redirect to Result Page with Prediction Data
      navigate("/result", { state: { prediction: data.prediction } });
    } catch (error) {
      console.error("❌ Error fetching prediction:", error);
      alert(`❌ ${error.message}`);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="login-container min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Churn Prediction</h1>
      <form
        onSubmit={handleSubmit}
        className="glass bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <label className="block mb-2">Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Tenure (Months):</label>
        <input
          type="number"
          name="tenure"
          value={formData.tenure}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Monthly Charges ($):</label>
        <input
          type="number"
          name="monthlyCharges"
          value={formData.monthlyCharges}
          onChange={handleChange}
          step="0.01"
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Contract Type:</label>
        <select
          name="contract"
          value={formData.contract}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        >
          <option value="">Select Contract</option>
          <option value="month-to-month">Month-to-Month</option>
          <option value="one-year">One Year</option>
          <option value="two-year">Two Year</option>
        </select>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>
    </div>
  );
};

export default PredictionPage;
