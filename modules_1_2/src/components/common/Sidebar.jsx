import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // 1. IMPORT LINK COMPONENT

// --- SVG Icon Components (self-contained for simplicity) ---

const IconDashboard = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect>
  </svg>
);

const IconUsers = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const IconSettings = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const IconCourses = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const IconQuestions = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

const IconExams = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const IconChevronLeft = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

// Added missing icons to prevent errors
const IconModules = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>);


// --- Role-based Navigation Links Configuration ---

const navLinks = {
  Administrator: [
    { label: 'Dashboard', path: '/admin/', icon: IconDashboard },
    { label: 'Users', path: '/admin/users', icon: IconUsers },
    { label: 'Settings', path: '/admin/settings', icon: IconSettings },
  ],
  // 2. UPDATED PATHS AND ADDED MISSING LINKS
  Instructor: [
    { label: 'Dashboard', path: '/', icon: IconDashboard },
    { label: 'Courses', path: '/courses', icon: IconCourses },
    { label: 'Modules', path: '/modules', icon: IconModules },
    { label: 'Questions', path: '/questions', icon: IconQuestions },
    { label: 'Exams', path: '/exams', icon: IconExams },
    { label: 'Students', path: '/students', icon: IconUsers },
  ],
};

const Sidebar = ({
  userRole = 'Instructor',
  activeRoute = '/',
  isMobileOpen,
  setMobileOpen,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const links = useMemo(() => navLinks[userRole] || [], [userRole]);

  const sidebarClasses = `
    bg-white h-screen flex flex-col z-40 fixed lg:relative
    transition-all duration-300 ease-in-out
    lg:translate-x-0
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    ${isCollapsed ? 'w-20' : 'w-64'}
  `;

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          aria-hidden="true"
        ></div>
      )}

      <aside className={sidebarClasses}>
        <div className="flex items-center justify-center border-b border-black/10 transition-all" style={{ height: '4rem' }}>
          <span className={`font-bold text-xl tracking-tight transition-opacity duration-200 whitespace-nowrap ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>ExamPlatform</span>
          <span className={`absolute w-2.5 h-2.5 bg-red-500 rounded-full transition-opacity duration-200 ${isCollapsed ? 'opacity-100' : 'opacity-0'}`}></span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = activeRoute === link.path;
            return (
              // 3. REPLACED <a> TAG WITH <Link>
              <Link
                key={link.label}
                to={link.path}
                className={`
                  flex items-center p-3 rounded-md text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-black text-white' 
                    : 'text-black/70 hover:bg-black/5'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? link.label : ''}
              >
                <link.icon className={`h-5 w-5 shrink-0 ${!isCollapsed ? 'mr-3' : 'mr-0'}`} />
                <span className={`transition-opacity whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                  {link.label}
                </span>
                {isActive && !isCollapsed && (
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full ml-auto"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* --- Collapse Toggle Button (Desktop Only) --- */}
        <div className="hidden lg:block border-t border-black/10 p-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`
                flex items-center w-full p-3 rounded-md text-sm font-medium transition-colors
                text-black/70 hover:bg-black/5
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
                <IconChevronLeft className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} />
                <span className={`ml-3 transition-opacity whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>Collapse</span>
            </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
