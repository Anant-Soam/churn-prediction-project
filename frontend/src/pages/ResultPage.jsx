import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation(); // Get prediction data
  const navigate = useNavigate();
  const prediction = location.state?.prediction; // Access prediction

  return (
    <div className="login-container min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className=" text-3xl font-bold mb-6">Prediction Result</h1>
      <div className=" glass bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center h-50">
        <h2 className="text-xl font-bold">Churn Prediction:</h2>
        <p className={`text-lg font-semibold ${prediction === "Churn" ? "text-red-600" : "text-green-600"}`}>
          {prediction === "Churn" ? "Customer is likely to Churn" : "Customer is likely to Stay"}
        </p>

        <button onClick={() => navigate("/prediction")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
