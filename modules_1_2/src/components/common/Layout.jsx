import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Detect user role from current route (admin / student / instructor)
  const detectedRole = useMemo(() => {
    if (location.pathname.startsWith('/admin')) return 'Administrator';
    if (location.pathname.startsWith('/student')) return 'Student';
    return 'Instructor';
  }, [location.pathname]);

  // Dynamic user info for display
  const loggedInUser = useMemo(() => {
    if (detectedRole === 'Administrator') {
      return { name: 'Taylor Smith', role: 'Administrator' };
    } else if (detectedRole === 'Student') {
      return { name: 'Alex Carter', role: 'Student' };
    } else {
      return { name: 'Jamie Rivera', role: 'Instructor' };
    }
  }, [detectedRole]);

  return (
    <div className="flex min-h-screen bg-black font-sans text-gray-200">
      <Sidebar
        userRole={loggedInUser.role}
        activeRoute={location.pathname}
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          user={loggedInUser}
          onMenuButtonClick={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-[#0a0a0a] p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
