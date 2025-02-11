import React from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/Navbar.css'; // Import CSS for styling
import Logout from './Logout';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/">Writely</NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/blogs">Blogs</NavLink>
        </li>
        <li>
          <NavLink to="/create">Create Blog</NavLink>
        </li>
        <li>
        <NavLink to="/register">Register</NavLink>
        </li>
        <li>
        <NavLink to="/login">Login</NavLink>
        </li>
        <li>
        <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
           <Logout/>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

