import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/actions/authActions';

const Leaderboard = ({ users, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar} alt={`Avatar ${user.name}`} />
            <span>{user.name}</span>
            <span>Score: {user.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.auth.users,
});

export default connect(mapStateToProps, { fetchUsers })(Leaderboard);
