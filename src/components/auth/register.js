import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from '../../images/logo.png'; 

const Register = ({ register }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    register(email, password);
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="title">Register</h2>
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
      <button onClick={handleRegister} className="button">
        Register
      </button>
    </div>
  );
};

export default connect(null, { Register }) (Register);
