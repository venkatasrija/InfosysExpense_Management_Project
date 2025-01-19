import React from "react";
import Sidebar from "./UserSidebar";

const UserLayout = ({ children }) => {
  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh", // Ensures the layout spans the full height of the viewport
    },
    content: {
      flex: 1,
      padding: "20px",
      backgroundColor: "#f9f9f9", // Adds a subtle background for better separation
      overflowY: "auto", // Ensures scrollability for large content
    },
  };

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.content}>{children}</main>
    </div>
  );
};

export default UserLayout;
