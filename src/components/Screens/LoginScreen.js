import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions'
import './LoginScreen.css';
// import LoginImg from '../../../assets/login.png';

const LoginScreen = ({ login }) => {
  const [state, setState] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    login(state);
  }

  const onChange = (event) => {
    setState({...state, [event.target.id]: event.target.value});
  }

  return (
    <div className="login-container">
      <div>
        <img src="../../../assets/login.png" />
      </div>
      <form autoComplete="off" onSubmit={onSubmit}>
        <h2>Inicio de sesión</h2>
        <div className="form-control">
          <input id="email" type="text" value={state.nuuvola} onChange={onChange} />
          <label htmlFor="email">Correo Electrónico</label>
        </div>
        <div className="form-control">
          <input id="password" type="password" value={state.nuuvola} onChange={onChange} />
          <label htmlFor="password">Contraseña</label>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return { login: payload => dispatch(login(payload)) }
}

export default connect(null, mapDispatchToProps)(LoginScreen);