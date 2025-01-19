import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import deleteIcon from "../assets/delete.png";

const UserReport = () => {
  const { userId } = useParams(); // Extract userId from route params

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(""); // State to store total amount
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(""); // To handle API errors
  const [successMessage, setSuccessMessage] = useState(""); // Success message for delete

  const API_BASE_URL = `http://localhost:9898/api/user/${userId}/report`;

  const styles = {
    container: {
      padding: "100px 20px", // Padding for navbar space
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Roboto', sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333",
    },
    form: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px",
    },
    label: {
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
    },
    button: {
      padding: "10px 15px",
      fontSize: "16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      color: "#fff",
    },
    addButton: {
      backgroundColor: "#007bff",
      marginRight: "10px",
    },
    cancelButton: {
      backgroundColor: "gray",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    tableHeader: {
      backgroundColor: "#007bff",
      color: "#fff",
      fontWeight: "bold",
      textAlign: "left",
      padding: "10px",
    },
    tableCell: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    actions: {
      display: "flex",
      gap: "10px",
    },
    actionButton: {
      padding: "4px 10px",
      fontSize: "13px",
      cursor: "pointer",
    },
    deleteButton: {
      color: "#fff",
    },
    error: {
      color: "#dc3545",
      fontSize: "14px",
      marginBottom: "20px",
    },
    successMessage: {
      color: "#28a745",
      fontSize: "14px",
      marginBottom: "20px",
    },
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    axios
      .get(`${API_BASE_URL}/all`)
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
        setError("Failed to fetch reports.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    } else if (name === "totalAmount") {
      setTotalAmount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportData = {
      startDate,
      endDate,
      totalAmount,
    };

    axios
      .post(`${API_BASE_URL}/add`, reportData)
      .then((response) => {
        setReports(response.data);
        setError(""); // Clear any previous errors
        setSuccessMessage("Report generated successfully.");
      })
      .catch((error) => {
        setError("Failed to generate report");
      });
  };

  const handleDelete = (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      axios
        .delete(`${API_BASE_URL}/delete/${reportId}`)
        .then((response) => {
          setReports(reports.filter((report) => report.reportId !== reportId));
          alert("Report deleted successfully!");
        })
        .catch((error) => {
          alert("Error deleting report: " + error.message);
        });
    }
  };

  const calculatePeriod = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return diffDays;
  };

  // Helper function to format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      timeZone: "UTC",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Report Management</h2>
      {error && <p style={styles.error}>{error}</p>}
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Start Date*</label>
          <input
            style={styles.input}
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>End Date*</label>
          <input
            style={styles.input}
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Total Amount*</label>
          <input
            style={styles.input}
            type="number"
            name="totalAmount"
            value={totalAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button
            style={{ ...styles.button, ...styles.addButton }}
            type="submit"
          >
            Generate Report
          </button>
        </div>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Period</th>
            <th style={styles.tableHeader}>Total Amount</th>
            <th style={styles.tableHeader}>Generated Date</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.reportId}>
              <td style={styles.tableCell}>
                {calculatePeriod(report.startDate, report.endDate)} Days
              </td>
              <td style={styles.tableCell}>{report.totalAmount}</td>
              <td style={styles.tableCell}>
                {formatDate(report.generatedDate)}
              </td>

              <td style={styles.tableCell}>
                <div style={styles.actions}>
                  <button
                    style={{ ...styles.actionButton, ...styles.deleteButton }}
                    onClick={() => handleDelete(report.reportId)}
                  >
                    <img
                    src={deleteIcon}
                    alt="Delete"
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserReport;
