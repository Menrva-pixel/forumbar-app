import React, { useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/authActions';
import logo from '../../images/logo.png';
import Swal from 'sweetalert2';

const Register = ({ registerUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser(name, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Registration Success',
        text: 'You have successfully registered.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
      });
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="title">Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
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

export default connect(null, { registerUser })(Register);
