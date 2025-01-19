import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginRequest = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:9898/api/admin/login", // Backend endpoint
        loginRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data);
      if (response.data === "Login Successful") {
        navigate("../admin/expenses");
      }
    } catch (error) {
      setMessage("");
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  // Styles to match UserLoginPage with orange gradient
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Orange gradient
      fontFamily: "'Poppins', sans-serif",
      padding: "0 20px",
    },
    card: {
      width: "100%",
      height: "390px",
      maxWidth: "475px",
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      backdropFilter: "blur(10px)", // Blur effect for elegance
      backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background
    },
    heading: {
      fontSize: "1.8rem",
      marginBottom: "20px",
      fontWeight: "600",
      color: "#333",
    },
    label: {
      textAlign: "left",
      display: "block",
      marginBottom: "5px",
      fontWeight: "500",
      fontSize: "1rem",
      color: "#555",
    },
    input: {
      width: "452px",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1rem",
      fontFamily: "'Poppins', sans-serif",
    },
    button: {
      width: "100%",
      padding: "10px",
      fontSize: "1rem",
      fontWeight: "600",
      color: "#fff",
      background: "linear-gradient(45deg, #28a745, #218838)",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      margin: "10px 0",
    },
    buttonSecondary: {
      background: "linear-gradient(45deg, #007bff, #0056b3)",
    },
    buttonHover: {
      filter: "brightness(1.2)",
    },
    message: {
      margin: "10px 0",
      fontSize: "1rem",
      color: "green",
    },
    error: {
      margin: "10px 0",
      fontSize: "1rem",
      color: "red",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Admin Login</h2>
        {message && <p style={styles.message}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" style={styles.label}>
              Email:
            </label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
              aria-label="Email"
            />
          </div>
          <div>
            <label htmlFor="password" style={styles.label}>
              Password:
            </label>
            <input
              style={styles.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              aria-label="Password"
            />
          </div>
          <button
            style={styles.button}
            type="submit"
            onMouseOver={(e) =>
              Object.assign(e.target.style, styles.buttonHover)
            }
            onMouseOut={(e) => (e.target.style.filter = "")}
          >
            Login
          </button>
        </form>
        <button
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onClick={() => navigate("/admin/register")}
          onMouseOver={(e) =>
            Object.assign(e.target.style, styles.buttonHover)
          }
          onMouseOut={(e) => (e.target.style.filter = "")}
        >
          Don't have an account?
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
