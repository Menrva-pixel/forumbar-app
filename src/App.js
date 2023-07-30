import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/navbar';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Forum from './components/forum/forum';
import DetailThread from './components/forum/detailThread';
import Leaderboard from './components/leaderboard';
import LandingPage from './components/landingpage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forum" element={<Forum/>} />
            <Route path="/thread/:threadId" element={<DetailThread/>} />
            <Route path="/leaderboard" component={Leaderboard} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};


export default App;
