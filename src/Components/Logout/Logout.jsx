import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    const email = localStorage.getItem('email');
    const logoutTimestamp = new Date().toISOString();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:9090/api/logout', {
        email,
        logoutTimestamp
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';
      }
    } catch (error) {
      if (error.response) {
        console.error('Logout failed: Unauthorized');
        alert('Your session has expired. Please log in again.');
        localStorage.clear();
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
      }
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
