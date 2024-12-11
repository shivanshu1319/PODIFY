import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage user authentication state

  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (storedAuthState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Navigate to login.html (static HTML page)
    window.location.href = '/Login.html'; // Ensure login.html is in the public folder
  };

  const handleSignup = () => {
    // Navigate to signup.html (static HTML page)
    window.location.href = '/signup.html'; // Ensure signup.html is in the public folder
  };

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false'); // Simulate logout by clearing storage
    setIsAuthenticated(false); // Set authentication state to false (simulated logout)
  };

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold p-4'>
        <div className='flex items-center gap-4'>
          <img 
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer' 
            src={assets.arrow_left} 
            alt="Back" 
            onClick={() => window.history.back()}  // Using browser's back button
          />
          <img 
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer' 
            src={assets.arrow_right} 
            alt="Forward" 
            onClick={() => window.history.forward()} // Using browser's forward button
          />
        </div>

        <div className='flex items-center gap-4'>
          {isAuthenticated ? (
            <>
              <button
                className='bg-red-500 text-white px-4 py-1 rounded-2xl cursor-pointer'
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className='bg-blue-500 text-white px-4 py-1 rounded-2xl cursor-pointer'
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className='bg-green-500 text-white px-4 py-1 rounded-2xl cursor-pointer'
                onClick={handleSignup}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className='flex items-center gap-2 mt-4 px-4'>
        <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        
      </div>
    </>
  );
};

export default Navbar;
