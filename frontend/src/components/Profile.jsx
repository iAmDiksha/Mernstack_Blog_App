import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          alert('Please log in first.');
          window.location.href = '/login';
          return;
        }

        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch profile. Please log in again.');
      } finally {
        setLoading(false); // Stop loading when the fetch is complete
      }
    };

    fetchUserData();
  }, []);

  // Handle updating user profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('authToken');
      await axios.put('http://localhost:5000/api/user/profile', {
        username,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditing(false);
      alert('Profile updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error if data fetching fails
  }

  if (!user) {
    return <div>No user data available.</div>; // Fallback in case of no data
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      {isEditing ? (
        <form onSubmit={handleUpdateProfile}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
