import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';
import './Topbar.css';

const Topbar = ({ user, logout }) => {
  return (
    <div className="topbar">
      <span>{user.displayName}</span>
      <button className="btn" onClick={logout}>Salir</button>
    </div>
  );
}

export default connect(null, { logout })(Topbar);