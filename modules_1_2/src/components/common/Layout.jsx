import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx'; // Corrected import path
import Sidebar from './Sidebar.jsx'; // Corrected import path

/**
 * The main layout component for the application.
 * It includes the Sidebar and Navbar, and renders the page content as its children.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The page component to render inside the layout.
 */
const Layout = ({ children }) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation(); 

  // Mock user data. In a real app, this would come from a global state or context.
  const user = {
    name: 'Jamie Rivera',
    role: 'Instructor', // Changed to Instructor to match the pages
  };
  
  const activeRoute = location.pathname; 

  return (
    <div className="bg-white min-h-screen flex">
      {/* --- Sidebar --- */}
      <Sidebar
        userRole={user.role}
        activeRoute={activeRoute}
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* --- Navbar --- */}
        <Navbar 
          user={user} 
          onMenuButtonClick={() => setMobileSidebarOpen(true)} 
        />
        
        {/* --- Page Content --- */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-black/5 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

