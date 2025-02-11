import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const token = response.data.token;

    // Save the token to session storage
    sessionStorage.setItem('authToken', token);
      alert('Login successful');
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Registration failed');
      }
    }
  };

  return (
    <form className='form' onSubmit={handleLogin}>
      <h1 className='heading'>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div style={{ position: 'relative' }}>
      <input
        type={showPassword ? 'text' : 'password'} 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       <span
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
          onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
        >
          {showPassword ? <i className="ri-eye-line"></i> : <i className="ri-eye-off-line"></i>} 
        </span>
        </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


/*
const fetchProtectedData = async () => {
    const token = sessionStorage.getItem('authToken');
  
    if (!token) {
      alert('Please log in to access this content.');
      window.location.href = '/login';
      return;
    }
  
    try {
      const response = await axios.get('/api/protected-route', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Use the protected data here
      console.log(response.data);
    } catch (error) {
      alert('Failed to fetch protected data. Please log in again.');
    }
  };
  
*/

/**
 Step 4: Check Authentication Status on App Load
You can add a function to check if the user is authenticated on app load by checking the presence of the token in session storage:

javascript
Copy code
const isAuthenticated = () => {
  return !!sessionStorage.getItem('authToken');
};

// Example usage in a React component
useEffect(() => {
  if (!isAuthenticated()) {
    alert('You are not authenticated. Redirecting to login...');
    window.location.href = '/login';
  }
}, []);
 */