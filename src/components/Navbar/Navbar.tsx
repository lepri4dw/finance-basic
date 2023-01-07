import React from 'react';
import {Link, NavLink} from "react-router-dom";

const Navbar = () => {
  return (
      <div className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
        <div className="container">
          <Link to="/" className="navbar-brand">Finance tracker</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/new-transaction" className="nav-link">Add</NavLink>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
};

export default Navbar;