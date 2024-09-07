import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const TeacherSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    testSeries: "ECAT", // Default value for the dropdown
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/teacher-signup", formData);
      setSuccessMessage("Signup successful");
      setError("");
      console.log(response.data);
    } catch (err) {
      setError("Failed to signup");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm" 
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Teacher Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testSeries">
            Test Series
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="testSeries"
            name="testSeries"
            value={formData.testSeries}
            onChange={handleChange}
            required
          >
            <option value="ECAT">ECAT</option>
            <option value="MDCAT">MDCAT</option>
            <option value="NTS">NTS</option>
            <option value="SAT">SAT</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/teacher-signin" className="text-blue-500 hover:text-blue-700">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default TeacherSignUp;
