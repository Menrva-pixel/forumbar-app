import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get('https://forum-api.dicoding.dev/v1/users/me', config)
      .then((response) => {
        setUserData(response.data.data.user);
      })
      .catch((error) => {
        console.error('Failed to fetch profile data:', error);
      });
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>{userData.name}</h2>
          <p>Email: {userData.email}</p>
          <img src={userData.avatar} alt="Profile Avatar" />
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default Profile;
