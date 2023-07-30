import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import logo from '../../images/logo.png';
import Swal from 'sweetalert2';

const Login = ({ isAuthenticated, loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const token = await loginUser(email, password);
      // Simpan token di local storage setelah login berhasil
      localStorage.setItem('userToken', token);
      Swal.fire({
        icon: 'success',
        title: 'Login Success',
        text: 'You have successfully logged in.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
      });
    }
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps, { loginUser })(Login);
