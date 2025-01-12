import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('Islogged') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('Islogged');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <h1>MyApp</h1>
      </div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          {!isLoggedIn ? (
            <>
              <li style={styles.navItem}>
                <Link to="/login" style={styles.navLink}>Login</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/register" style={styles.navLink}>Register</Link>
              </li>
            </>
          ) : (
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.navLink}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 25px',
    backgroundColor: '#333',  // Dark background color
    color: '#fff',  // Text color for better contrast
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',  // Subtle shadow for depth
  },
  logo: {
    fontSize: '1.8rem',  // Larger font size for better prominence
    fontWeight: 'bold',  // Bold text for brand recognition
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '30px',  // Increased gap for better spacing between items
  },
  navItem: {
    display: 'inline-block',  // Ensure each item takes up only necessary space
  },
  navLink: {
    color: '#fff',  // White text for links
    textDecoration: 'none',
    fontSize: '1.1rem',  // Slightly larger font size for better readability
    fontWeight: '500',  // Medium weight for better balance
    padding: '8px 15px',  // Comfortable padding for clickable areas
    borderRadius: '4px',  // Rounded corners for a modern look
    transition: 'background-color 0.3s ease',  // Smooth hover effect transition
  },
  navLinkHover: {
    backgroundColor: '#555',  // Subtle hover effect for links
  },
};

export default Navbar;
