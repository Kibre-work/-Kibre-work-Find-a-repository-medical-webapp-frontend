import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded doctor credentials
    const doctorEmail = "doctor@example.com";
    const doctorPassword = "password123";

    if (email === doctorEmail && password === doctorPassword) {
      navigate("/dashboard-doctor");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-lg bg-white mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Doctor Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        {error && <p className="text-center text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default DoctorLogin;