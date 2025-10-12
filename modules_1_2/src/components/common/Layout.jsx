import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// These components are in the same folder, so the path is './'
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const loggedInUser = {
    name: 'Jamie Rivera',
    role: 'Instructor',
  };

  // Get the current path from the router to highlight the active link
  const activeRoute = location.pathname; 

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        userRole={loggedInUser.role}
        activeRoute={activeRoute}
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          user={loggedInUser}
          onMenuButtonClick={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-black/5 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

