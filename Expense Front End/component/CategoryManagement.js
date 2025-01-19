import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";


const CategoryManagement = () => {
  const { userId } = useParams(); // Extract userId from the route
  const navigate = useNavigate(); // Navigation hook (for future use)

  const [category, setCategory] = useState({ name: "", description: "" });
  const [categoryList, setCategoryList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_BASE_URL = `http://localhost:9898/api/user/${userId}/category`;

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
    fetchCategories();
  }, [userId]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setCategoryList(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { 
      ...category, 
      userId, // Make sure userId is sent with the payload
      categoryId: editing ? editId : null // backend expects categoryId, not id
    };

    try {
      if (editing) {
        await axios.post(`${API_BASE_URL}/add`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/add`, payload); // Add category
      }
      fetchCategories();
      resetForm();
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios
        .delete(`${API_BASE_URL}/delete/${categoryId}`)
        .then((response) => {
          // Update the category list based on the response
          setCategoryList(response.data); // Assuming the response returns the updated list of categories
          alert("Category deleted successfully!");
        })
        .catch((error) => {
          alert("Error deleting category: " + error.message);
        });
    }
  };
  
  const handleEdit = (category) => {
    setCategory({
      name: category.name,
      description: category.description,
    });
    setEditId(category.categoryId); // Use categoryId for editing
    setEditing(true);
  };

  const resetForm = () => {
    setCategory({ name: "", description: "" });
    setEditId(null);
    setEditing(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Category Management</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Category Name*</label>
          <input
            style={styles.input}
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description*</label>
          <textarea
            style={styles.input}
            name="description"
            value={category.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <button style={{ ...styles.button, ...styles.addButton }} type="submit">
            {editing ? "Update Category" : "Add Category"}
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
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((cat) => (
            <tr key={cat.categoryId}> {/* Changed from 'id' to 'categoryId' */}
              <td style={styles.tableCell}>{cat.name}</td>
              <td style={styles.tableCell}>{cat.description}</td>
              <td style={styles.tableCell}>
                <div style={styles.actions}>
                  <button
                    style={{ ...styles.actionButton, ...styles.editButton }}
                    onClick={() => handleEdit(cat)}
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
                    onClick={() => handleDelete(cat.categoryId)} // Use categoryId
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

export default CategoryManagement;
