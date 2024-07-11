import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Components/Home/HomePage'; // Adjust the path as needed
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import './App.css';
import AdminDashboard from './Components/Dashboard/admin/admin-dashboard';
import UserDashboard from './Components/Dashboard/user/user-dashboard';
import Book from './Components/Book/Book';
import AuthorPublisher from './Components/AuthorPublisher/AuthorPublisher';
import DisplayLikeCard from './Components/BookCard/DisplayLikeCard';
import ContactForm from './Components/Contact/ContactForm';
import PurchaseList from './Components/PurchaseList/PurchaseList';

function App() {
  const email = window.localStorage.getItem('email');
  const role = window.localStorage.getItem('role'); 

  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/books" element={<Book />} />
          <Route path="/manage" element={<AuthorPublisher />} />
          <Route path="/orders" element={<PurchaseList/>} />
          <Route path="/liked-books" element={<DisplayLikeCard />} />
          {role === 'ROLE_ADMIN' ? (
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="*" element={<Navigate to={email ? (role === 'ROLE_ADMIN' ? "/admin-dashboard" : "/user-dashboard") : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
