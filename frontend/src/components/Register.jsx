import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(''); 

  const validatePassword = (password) => {
    // Regular expression to check password requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      const token = response.data.token;
    sessionStorage.setItem('authToken', token);
    
      alert(response.data.message);
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
    <form className='form' onSubmit={handleRegister}>
    <h1 className='heading'>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <div style={{ position: 'relative' }}>
      <input
        type={showPassword ? 'text' : 'password'} 
        placeholder="Password"
        value={password}
        required
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
        {passwordError && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {passwordError}
          </span>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
