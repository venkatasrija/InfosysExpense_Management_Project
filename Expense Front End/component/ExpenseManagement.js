import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";

const ExpenseManagement = () => {
  const { userId } = useParams(); // Extract userId from the route

  const [expense, setExpense] = useState({
    userName: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });
  const [expenseList, setExpenseList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_BASE_URL = `http://localhost:9898/api/user/${userId}/expense`;

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
    editButton: {
      color: "#fff",
    },
    deleteButton: {
      color: "#fff",
    },
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/all`)
      .then((response) => setExpenseList(response.data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...expense, id: editing ? editId : null };

    axios
      .post(`${API_BASE_URL}/add`, payload)
      .then((response) => {
        setExpenseList(response.data);
        resetForm();
      })
      .catch((error) => console.error("Error updating/adding expense:", error));
  };

  const handleDelete = (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      axios
        .delete(`${API_BASE_URL}/delete/${expenseId}`)
        .then((response) => {
          setExpenseList(response.data);
          alert("Expense deleted successfully!");
        })
        .catch((error) => alert("Error deleting expense: " + error.message));
    }
  };

  const handleEdit = (expense) => {
    setExpense({
      userName: expense.userName,
      amount: expense.amount,
      date: expense.date,
      category: expense.category,
      description: expense.description,
    });
    setEditId(expense.id);
    setEditing(true);
  };

  const resetForm = () => {
    setExpense({
      userName: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
    setEditId(null);
    setEditing(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Expense Management</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Amount*</label>
          <input
            style={styles.input}
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Date*</label>
          <input
            style={styles.input}
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category*</label>
          <input
            style={styles.input}
            type="text"
            name="category"
            value={expense.category}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description*</label>
          <textarea
            style={styles.input}
            name="description"
            value={expense.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <button style={{ ...styles.button, ...styles.addButton }} type="submit">
            {editing ? "Update Expense" : "Add Expense"}
          </button>
          {editing && (
            <button
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={resetForm}
              type="button"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

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
          {expenseList.map((exp) => (
            <tr key={exp.id}>
              <td style={styles.tableCell}>{exp.userName}</td>
              <td style={styles.tableCell}>{exp.amount}</td>
              <td style={styles.tableCell}>{exp.date}</td>
              <td style={styles.tableCell}>{exp.category}</td>
              <td style={styles.tableCell}>{exp.description}</td>
              <td style={styles.tableCell}>
                <div style={styles.actions}>
                  <button
                    style={{ ...styles.actionButton, ...styles.editButton }}
                    onClick={() => handleEdit(exp)}
                  >
                    <img
                    src={editIcon}
                    alt="Delete"
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    />
                  </button>
                  <button
                    style={{ ...styles.actionButton, ...styles.deleteButton }}
                    onClick={() => handleDelete(exp.expenseId)}
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

export default ExpenseManagement;