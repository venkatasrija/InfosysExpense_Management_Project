import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 30px',
      background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', // Orange gradient background
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      color: '#fff',
      boxSizing: 'border-box',
      borderBottom: '2px solid #ff7e5f', // More prominent border for separation
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
      color: '#ff7e5f',
      borderColor: '#ff7e5f', // Orange border on hover
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
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo Section */}
      <Link to="/" style={styles.logo}>
        <span style={styles.logoIcon} role="img" aria-label="dollar-sign">
          💲
        </span>{' '}
        EMS
      </Link>

      {/* Navigation Links */}
      <div style={styles.navLinks}>
        {['/admin/expenses', '/admin/category', '/admin/reports'].map((path, index) => (
          <Link
            to={path}
            key={index}
            style={{
              ...styles.navLink,
              ...(location.pathname === path ? styles.activeNavLink : {}),
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = '')
            }
          >
            {path.split('/').pop().charAt(0).toUpperCase() +
              path.split('/').pop().slice(1)}
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button
        style={styles.logoutButton}
        onClick={handleLogout}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = styles.logoutButton.backgroundColor)
        }
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
