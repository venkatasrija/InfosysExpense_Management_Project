import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCategoryManagement = () => {
  const [categoryList, setCategoryList] = useState([]);

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
      cursor: "pointer",
      color: "#fff",
    },
    approveButton: {
      backgroundColor: "#28a745",
    },
    rejectButton: {
      backgroundColor: "#dc3545",
    },
    noCategories: {
      textAlign: "center",
      padding: "20px",
      fontSize: "16px",
      color: "#666",
    },
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:9898/api/admin/category/getcategories');
      setCategoryList(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleApprove = async (categoryId) => {
    try {
      await axios.post(`http://localhost:9898/api/admin/category/approve/${categoryId}`);
      alert('Category approved successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Error approving category:', error);
      alert('Failed to approve category.');
    }
  };

  const handleReject = async (categoryId) => {
    try {
      await axios.post(`http://localhost:9898/api/admin/category/reject/${categoryId}`);
      alert('Category rejected successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Error rejecting category:', error);
      alert('Failed to reject category.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Category Management</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 ? (
            categoryList.map((cat) => (
              <tr key={cat.id}>
                <td style={styles.tableCell}>{cat.name}</td>
                <td style={styles.tableCell}>{cat.description}</td>
                <td style={styles.tableCell}>
                  <div style={styles.actions}>
                    <button
                      style={{ ...styles.actionButton, ...styles.approveButton }}
                      onClick={() => handleApprove(cat.id)}
                    >
                      Approve
                    </button>
                    <button
                      style={{ ...styles.actionButton, ...styles.rejectButton }}
                      onClick={() => handleReject(cat.id)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={styles.noCategories}>
                No categories available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryManagement;
