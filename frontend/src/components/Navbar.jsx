import { useState } from "react";
import { Link } from "react-router-dom"; // If using React Router
import { FiMenu, FiX } from "react-icons/fi"; // Icons for the hamburger menu

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">ChurnPredictor</Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/prediction" className="hover:text-gray-300">Prediction</Link></li>
          <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
          <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col space-y-4 bg-gray-800 text-white p-4">
          <li><Link to="/" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Home</Link></li>
        
          <li><Link to="/prediction" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Prediction</Link></li>
          <li><Link to="/login" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Login</Link></li>
          <li><Link to="/register" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Register</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
