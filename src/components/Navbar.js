import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;