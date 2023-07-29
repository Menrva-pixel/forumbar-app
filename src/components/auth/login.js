import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import logo from '../../images/logo.png'; 

const Login = ({ login, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password
    };
    login(userData);
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="title">Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button onClick={handleLogin} className="button">
        Login
      </button>
      {isAuthenticated && <p>You are logged in!</p>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.user !== null,
});

export default connect(mapStateToProps, { login })(Login);
