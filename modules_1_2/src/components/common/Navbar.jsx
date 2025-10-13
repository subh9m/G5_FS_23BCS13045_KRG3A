import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

// Simple hamburger icon
const IconMenu = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

/**
 * Responsive, minimalist Navbar for all user roles (Admin, Instructor, Student)
 */
const Navbar = ({ user, onMenuButtonClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Detect role based on current route
  const detectedRole = useMemo(() => {
    if (location.pathname.startsWith('/admin')) return 'Administrator';
    if (location.pathname.startsWith('/student')) return 'Student';
    return 'Instructor';
  }, [location.pathname]);

  // Fall back to dynamic role if user.role is not passed
  const activeUser = useMemo(() => {
    return (
      user || {
        name:
          detectedRole === 'Administrator'
            ? 'Taylor Smith'
            : detectedRole === 'Student'
            ? 'Alex Carter'
            : 'Jamie Rivera',
        role: detectedRole,
      }
    );
  }, [user, detectedRole]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    console.log('User logged out');
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const getInitials = (name) =>
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <header className="sticky top-0 z-20 border-b border-[#333] bg-black/80 backdrop-blur-md font-sans">
      <nav className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* --- Left Section: Logo / Panel Name --- */}
          <div className="flex items-center space-x-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
            <h1 className="font-mono text-xl font-bold tracking-wider text-gray-100">
              {activeUser.role} Panel
            </h1>
          </div>

          {/* --- Right Section: Profile & Mobile Menu --- */}
          <div className="flex items-center space-x-4">
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center space-x-3 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#333] bg-[#0a0a0a] font-mono text-sm font-bold tracking-widest text-gray-200">
                  {getInitials(activeUser.name)}
                </div>
                <div className="hidden flex-col items-start text-left md:flex">
                  <span className="text-sm font-semibold text-gray-200">
                    {activeUser.name}
                  </span>
                  <span className="text-xs text-gray-400">{activeUser.role}</span>
                </div>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-3 w-56 origin-top-right rounded-xl border border-[#333] bg-black/80 backdrop-blur-lg shadow-2xl transition-all duration-300 ease-in-out ${
                  isDropdownOpen
                    ? 'scale-100 opacity-100'
                    : 'pointer-events-none scale-95 opacity-0'
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="p-1.5">
                  <div className="mb-1 border-b border-[#333] px-3.5 py-2.5">
                    <p className="text-sm font-semibold text-gray-400">
                      Signed in as
                    </p>
                    <p className="truncate font-mono text-sm text-gray-200">
                      {activeUser.name}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="block w-full rounded-md px-3.5 py-2 text-left text-sm text-gray-300 transition-colors duration-300 hover:bg-white/5 hover:text-red-500"
                    role="menuitem"
                  >
                    Account Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-md px-3.5 py-2 text-left text-sm font-semibold text-gray-300 transition-colors duration-300 hover:bg-red-500/10 hover:text-red-500"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="p-1 text-gray-400 transition-colors duration-300 hover:text-red-500 lg:hidden"
              onClick={onMenuButtonClick}
              aria-label="Open sidebar"
            >
              <IconMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
