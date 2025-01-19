import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import NotificationIcon from './NotificationIcon';

const UserNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleLogout = () => {
    navigate('/'); // Navigate to the home page on logout
  };

  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 30px',
      background: 'linear-gradient(90deg, #007bff, #0056b3)', // Gradient background
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      color: '#fff',
      boxSizing: 'border-box',
      borderBottom: '2px solid #0056b3', // More prominent border for separation
      borderRadius: '0 0 15px 15px', // Rounded bottom corners
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '26px',
      fontWeight: '600',
      textDecoration: 'none',
      color: '#fff',
      textTransform: 'uppercase',
    },
    logoIcon: {
      fontSize: '32px',
      marginRight: '12px',
      marginBottom: '5px',
    },
    navLinks: {
      display: 'flex',
      gap: '25px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    navLink: {
      textDecoration: 'none',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '500',
      padding: '8px 16px',
      borderRadius: '25px', // Rounded links
      border: '1px solid transparent',
      transition: 'all 0.3s ease',
    },
    activeNavLink: {
      fontWeight: '600',
      transform: 'scale(1.1)', // Slight zoom effect on active link
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Soft shadow around active link
    },
    navLinkHover: {
      backgroundColor: '#ffffff80', // Semi-transparent hover background
      color: '#007bff',
      borderColor: '#007bff', // Blue border on hover
      transform: 'scale(1.05)',
    },
    logoutButton: {
      backgroundColor: '#ff6347',
      color: '#fff',
      border: 'none',
      borderRadius: '25px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      minWidth: '120px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Subtle shadow effect
    },
    logoutButtonHover: {
      backgroundColor: '#ff4500',
      transform: 'scale(1.05)',
    },
    notificationWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px', // Space between notification icon and logout button
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo Section */}
      <Link to="/" style={styles.logo}>
        <span style={styles.logoIcon} role="img" aria-label="dollar-sign">💲</span> EMS
      </Link>

      {/* Navigation Links */}
      <div style={styles.navLinks}>
        <Link
          to={`/user/expenses/${userId}`}
          style={{
            ...styles.navLink,
            ...(location.pathname === `/user/expenses/${userId}` ? styles.activeNavLink : {}),
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.navLinkHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = ''} // Reset on mouse leave
        >
          Expenses
        </Link>
        <Link
          to={`/user/category/${userId}`}
          style={{
            ...styles.navLink,
            ...(location.pathname === `/user/category/${userId}` ? styles.activeNavLink : {}),
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.navLinkHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = ''}
        >
          Category
        </Link>
        <Link
          to={`/user/reports/${userId}`}
          style={{
            ...styles.navLink,
            ...(location.pathname === `/user/reports/${userId}` ? styles.activeNavLink : {}),
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.navLinkHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = ''}
        >
          Reports
        </Link>
      </div>

      {/* Notification Icon and Logout Button */}
      <div style={styles.notificationWrapper}>
        <NotificationIcon userId={userId} />
        <button
          style={styles.logoutButton}
          onClick={handleLogout}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.logoutButton.backgroundColor}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
