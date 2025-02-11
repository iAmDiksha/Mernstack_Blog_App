import React from 'react'

const Logout = () => {
    const handleLogout = () => {
        // Remove the token from session storage
        sessionStorage.removeItem('authToken');
      
        alert('You have been logged out.');
        // Redirect to the login page
        window.location.href = '/login';
    };
  return (
    <div>
      <button className='logout' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
