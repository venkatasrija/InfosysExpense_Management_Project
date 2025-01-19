import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminReport = () => {
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reports, setReports] = useState([]);

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
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    },
    tableHeader: {
      background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
      color: "#fff",
      fontWeight: "bold",
      textAlign: "left",
      padding: "10px",
    },
    tableCell: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
    actions: {
      display: "flex",
      gap: "10px",
    },
    actionButton: {
      padding: "8px 12px",
      fontSize: "14px",
      border: "none",
      borderRadius: "4px",
      background: "orange",
      cursor: "pointer",
      color: "#fff",
    },
    approveButton: {
      backgroundColor: "#28a745",
    },
    rejectButton: {
      backgroundColor: "#dc3545",
    },
    noReports: {
      textAlign: "center",
      padding: "20px",
      fontSize: "16px",
      color: "#666",
    },
  };

  useEffect(() => {
    axios.get("http://localhost:9898/api/admin").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const fetchReports = () => {
    axios.get(`http://localhost:9898/api/admin/report/getreports`).then((res) => {
      setReports(res.data);
    });
  };

  const generateReport = () => {
    const reportData = {
      period: `${new Date(startDate).toLocaleDateString()} - ${new Date(
        endDate
      ).toLocaleDateString()}`,
      totalAmount: Math.floor(Math.random() * 1000) + 100,
      generatedDate: new Date(),
    };

    axios
      .post(`http://localhost:9898/api/user/${userId}/report/add`, reportData)
      .then((res) => {
        setReports(res.data);
      });
  };

  const handleApprove = async (reportId) => {
    try {
      await axios.post(`http://localhost:9898/api/admin/report/approve/${reportId}`);
      alert('Report approved successfully!');
      fetchReports();
    } catch (error) {
      console.error('Error approving report:', error);
      alert('Failed to approve report.');
    }
  };

  const handleReject = async (reportId) => {
    try {
      await axios.post(`http://localhost:9898/api/admin/report/reject/${reportId}`);
      alert('Report rejected successfully!');
      fetchReports();
    } catch (error) {
      console.error('Error rejecting report:', error);
      alert('Failed to reject report.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Report Management</h2>

      <button style={styles.actionButton} onClick={fetchReports}>
        Generate Report
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>User</th>
            <th style={styles.tableHeader}>Period</th>
            <th style={styles.tableHeader}>Total Amount</th>
            <th style={styles.tableHeader}>Generated Date</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.reportId}>
                <td style={styles.tableCell}>{report.userName}</td>
                <td style={styles.tableCell}>{"20 Days "}</td>
                <td style={styles.tableCell}>{20000}</td>
                <td style={styles.tableCell}>{report.startDate}</td>
                <td style={styles.tableCell}>
                  <div style={styles.actions}>
                    <button
                      style={{ ...styles.actionButton, ...styles.approveButton }}
                      onClick={() => handleApprove(report.reportId)}
                    >
                      Approve
                    </button>
                    <button
                      style={{ ...styles.actionButton, ...styles.rejectButton }}
                      onClick={() => handleReject(report.reportId)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.noReports}>
                No reports available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReport;
