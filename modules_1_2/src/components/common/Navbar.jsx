import React, { useState, useEffect, useRef } from 'react';

/**
 * Navbar component for the main application layout.
 * Displays the app logo/title and a user profile dropdown menu.
 *
 * @param {object} props - The component props.
 * @param {object} props.user - The user object containing name and role. Defaults to a mock user.
 */
const Navbar = ({ user = { name: 'Alex Morgan', role: 'Administrator' } }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  // Mock logout function
  const handleLogout = () => {
    console.log('User logged out.');
    setIsDropdownOpen(false); // Close dropdown on logout
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when the dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  // Create user initials from the name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section: Logo and App Title */}
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-red-600 rounded-full"></span>
            <h1 className="text-xl font-bold tracking-tighter text-black">
              ExamPlatform
            </h1>
          </div>

          {/* Right Section: User Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex items-center space-x-3 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-transform transform hover:scale-105"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold text-sm">
                {getInitials(user.name)}
              </div>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="font-semibold text-sm text-black">{user.name}</span>
                <span className="text-xs text-gray-500">{user.role}</span>
              </div>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`
                absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                transition ease-out duration-150
                ${isDropdownOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}
              `}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-black" role="none">
                    Signed in as
                  </p>
                  <p className="text-sm text-gray-700 truncate" role="none">
                    {user.name}
                  </p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                  role="menuitem"
                >
                  Account Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-red-600"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;