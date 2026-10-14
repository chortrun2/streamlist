import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>EZTechMovie <span>StreamList</span></h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">
            <span className="material-icons">home</span> StreamList
          </Link>
        </li>
        <li>
          <Link to="/movies">
            <span className="material-icons">movie</span> Movies
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <span className="material-icons">shopping_cart</span> Cart
          </Link>
        </li>
        <li>
          <Link to="/about">
            <span className="material-icons">info</span> About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
