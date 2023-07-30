import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/actions/leaderboardActions';

const Leaderboard = ({ leaderboards, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaderboards.length > 0 ? (
        <ul>
          {leaderboards.map((user) => (
            <li key={user.user.id}>
              {user.user.name} - Score: {user.score}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  leaderboards: state.leaderboard.leaderboards,
});

export default connect(mapStateToProps, { fetchUsers })(Leaderboard);
