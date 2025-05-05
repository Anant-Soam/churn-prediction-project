import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">Customer Churn Prediction</h1>
        <p className="text-lg">Predict customer churn with AI-powered analytics.</p>
        <div className="space-x-4">
          <Link to="/login" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200">
            Login
          </Link>
          <Link to="/register" className="px-6 py-3 bg-transparent border border-white rounded-lg shadow-lg hover:bg-white hover:text-blue-600">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
