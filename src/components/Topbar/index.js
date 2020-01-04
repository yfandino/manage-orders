import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';
import { AuthContext } from '../Auth';
import './Topbar.css';

const Topbar = ({ logout }) => {

  const { user } = useContext(AuthContext);
  
  return (
    <div className="topbar">
      <span>{user.displayName}</span>
      <button className="btn" onClick={logout}>Salir</button>
    </div>
  );
}

export default connect(null, { logout })(Topbar);