import React, { useState, useEffect, useRef } from 'react';

// A simple hamburger menu icon for mobile responsiveness
const IconMenu = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

/**
 * A responsive and minimalist Navbar component for the main application layout.
 *
 * @param {object} props - The component props.
 * @param {object} props.user - The user object containing name and role.
 * @param {Function} props.onMenuButtonClick - Function to call when the mobile menu button is clicked.
 */
const Navbar = ({ user = { name: 'Alex Morgan', role: 'Administrator' }, onMenuButtonClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggles the visibility of the user profile dropdown.
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  // A mock logout function.
  const handleLogout = () => {
    console.log('User has been logged out.');
    setIsDropdownOpen(false); // Close dropdown after action
  };

  // Hook to close the dropdown when a click is detected outside of it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener on component unmount or when dropdown closes.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  // Generates user initials from their full name for the avatar.
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-black/10 sticky top-0 z-20 font-sans">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* --- Left Section: Mobile Menu Button + Logo/Title --- */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button (Visible on screens smaller than lg) */}
            <button
              type="button"
              className="p-1 text-black lg:hidden"
              onClick={onMenuButtonClick}
              aria-label="Open sidebar"
            >
              <IconMenu className="h-6 w-6" />
            </button>
            
            {/* Logo and App Title */}
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              <h1 className="text-xl font-bold tracking-tight text-black">
                ExamPlatform
              </h1>
            </div>
          </div>

          {/* --- Right Section: User Profile Dropdown --- */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex items-center space-x-3 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                {getInitials(user.name)}
              </div>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="font-semibold text-sm text-black">{user.name}</span>
                <span className="text-xs text-black/60">{user.role}</span>
              </div>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`
                absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5
                transition ease-out duration-100
                ${isDropdownOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}
              `}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <div className="px-4 py-3 border-b border-black/10">
                  <p className="text-sm font-semibold text-black" role="none">
                    Signed in as
                  </p>
                  <p className="text-sm text-black/80 truncate" role="none">
                    {user.name}
                  </p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-black transition-colors hover:bg-black/5"
                  role="menuitem"
                >
                  Account Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-black/5 hover:text-red-500"
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