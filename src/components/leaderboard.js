import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get('https://forum-api.dicoding.dev/v1/leaderboard');
      setLeaderboardData(response.data.data.leaderboards); // <-- Update this line to access "leaderboards" instead of "leaderboard"
    } catch (error) {
      console.error('Failed to fetch leaderboard data:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Leaderboard</h2>
      <div className="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr key={entry.user.id}>
                <td>{index + 1}</td>
                <td>{entry.user.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
