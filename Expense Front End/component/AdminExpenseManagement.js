import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminExpenseManagement = () => {
  const [expenseList, setExpenseList] = useState([]);

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
      background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
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
      padding: "8px 12px",
      fontSize: "14px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      color: "#fff",
    },
    approveButton: {
      backgroundColor: "#28a745",
    },
    rejectButton: {
      backgroundColor: "#dc3545",
    },
    noExpenses: {
      textAlign: "center",
      padding: "20px",
      fontSize: "16px",
      color: "#666",
    },
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:9898/api/admin/expense/getexpenses');
      setExpenseList(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleApprove = async (expenseId) => {
    try {
      await axios.post(`http://localhost:9898/api/admin/expense/approve/${expenseId}`);
      alert('Expense approved successfully!');
      fetchExpenses();
    } catch (error) {
      console.error('Error approving expense:', error);
      alert('Failed to approve expense.');
    }
  };

  const handleReject = async (expenseId) => {
    try {
      await axios.post(`http://localhost:9898/api/admin/expense/reject/${expenseId}`);
      alert('Expense rejected successfully!');
      fetchExpenses();
    } catch (error) {
      console.error('Error rejecting expense:', error);
      alert('Failed to reject expense.');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Expense Management</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>User</th>
            <th style={styles.tableHeader}>Amount</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Category</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenseList.length > 0 ? (
            expenseList.map((exp, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{exp.userName}</td>
                <td style={styles.tableCell}>{exp.amount}</td>
                <td style={styles.tableCell}>{exp.date}</td>
                <td style={styles.tableCell}>{exp.category}</td>
                <td style={styles.tableCell}>{exp.description}</td>
                <td style={styles.tableCell}>
                  <div style={styles.actions}>
                    <button
                      style={{ ...styles.actionButton, ...styles.approveButton }}
                      onClick={() => handleApprove(exp.id)}
                    >
                      Approve
                    </button>
                    <button
                      style={{ ...styles.actionButton, ...styles.rejectButton }}
                      onClick={() => handleReject(exp.id)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.noExpenses}>
                No expenses available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminExpenseManagement;
