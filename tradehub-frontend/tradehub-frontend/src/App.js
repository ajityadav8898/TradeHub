import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminEbooks from "./pages/AdminEbooks";
import UserEbooks from "./pages/UserEbooks";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Panel Route */}
        <Route path="/admin" element={<AdminEbooks />} />
        
        {/* User Ebooks Route */}
        <Route path="/" element={<UserEbooks />} />

        {/* Default Route (Optional) */}
        <Route path="/ebooks" element={<h1>EBooks to Enhance your trading knowledge</h1>} />
      </Routes>
    </Router>
  );
}

export default App; 