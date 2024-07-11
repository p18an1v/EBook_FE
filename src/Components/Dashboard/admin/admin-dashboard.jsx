import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from '../../Logout/Logout';
import './admin-dashboard.css';

function AdminDashboard() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9090/api/activities', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return { date: '', time: '' };
    const dateObj = new Date(timestamp);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };

  const filteredActivities = activities.filter(activity => !activity.email.endsWith('@numetry.in'));

  return (
    <div className="admin-dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="/books">Books</a></li>
            <li><a href="/orders">Orders</a></li>
            <li><Logout /></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <div className="header">
          <h2>Activity Log</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Date</th>
              <th>Login Time</th>
              <th>Logout Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((activity, index) => {
              const login = formatTimestamp(activity.loginTimestamp);
              const logout = formatTimestamp(activity.logoutTimestamp);
              return (
                <tr key={index}>
                  <td data-label="Email">{activity.email}</td>
                  <td data-label="Login Date">{login.date}</td>
                  <td data-label="Login Time">{login.time}</td>
                  <td data-label="Logout Time">{logout.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AdminDashboard;
