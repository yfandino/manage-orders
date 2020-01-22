import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaListUl, FaBoxOpen, FaCalculator } from 'react-icons/fa';
import './Sidebar.css'

const Sidebar = () => {

  let location = useLocation();

  return(
    <nav className="sidebar">
      <ul>
        <li className={location.pathname === '/' ? "selected" : ""}>
          <Link to="/"><FaListUl size={32} color="#fff" /></Link>
        </li>
        <li className={location.pathname === '/orders' ? "selected" : ""}>
          <Link to="/orders"><FaBoxOpen size={32} color="#fff" /></Link>
        </li>
        <li className={location.pathname === '/calc' ? "selected" : ""}>
          <Link to="/calc"><FaCalculator size={32} color="#fff" /></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar;