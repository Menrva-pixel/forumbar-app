import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Forum from './components/forum/forum';
import Navbar from './components/navbar';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
