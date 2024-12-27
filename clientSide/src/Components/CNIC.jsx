import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Correct import of axios

const CNICPage = () => {
  const navigate = useNavigate();
  const [cnic, setCnic] = useState("");
  const [error, setError] = useState("");

  // Function to validate CNIC
  const validateCnic = (value) => {
    // const cnicRegex = /^\d{5}-\d{7}-\d$/;
    // return cnicRegex.test(value);
    return true; // Temporary return value
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCnic(cnic)) {
      setError("");
      const isPrisoner = await checkPrisoner();
      if (isPrisoner) {
        alert(`CNIC Submitted: ${cnic}`);
      } else {
        setError("No prisoner found with the provided CNIC.");
      }
    } else {
      setError("Please enter a valid CNIC (e.g., 12345-1234567-1)");
    }
  };

  const checkPrisoner = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/visitor/getData?visitorId=${cnic}`
      );
      console.log(response.data);
      if (response.status === 200) {
        const visitorData = response.data;
        navigate("/welcome", { state: { visitorData, cnic } });
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while checking the CNIC. Please try again.");
      return false;
    }
  };

  return (
    <div className="bg-[#333333] text-white flex flex-col items-center justify-start pt-8 px-4">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Enter Your CNIC</h1>
        <p className="text-gray-400">
          Please provide your CNIC to proceed (Format: 12345-1234567-1).
        </p>
      </header>

      {/* Form */}
      <form
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        {/* Input Field */}
        <div className="mb-4">
          <label htmlFor="cnic" className="block text-gray-300 text-sm mb-2">
            CNIC Number
          </label>
          <input
            type="text"
            id="cnic"
            name="cnic"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="12345-1234567-1"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CNICPage;
