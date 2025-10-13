import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Home as IconDashboard,
  BookOpen as IconCourses,
  Layers as IconModules,
  HelpCircle as IconQuestions,
  FileText as IconExams,
  Users as IconUsers,
  Settings as IconSettings,
} from 'lucide-react';

const navLinks = {
  Administrator: [
    { label: 'Dashboard', path: '/admin/', icon: IconDashboard },
    { label: 'Users', path: '/admin/users', icon: IconUsers },
    { label: 'Settings', path: '/admin/settings', icon: IconSettings },
  ],
  Instructor: [
    { label: 'Dashboard', path: '/', icon: IconDashboard },
    { label: 'Courses', path: '/courses', icon: IconCourses },
    { label: 'Modules', path: '/modules', icon: IconModules },
    { label: 'Questions', path: '/questions', icon: IconQuestions },
    { label: 'Exams', path: '/exams', icon: IconExams },
    { label: 'Students', path: '/students', icon: IconUsers },
  ],
  Student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: IconDashboard },
    { label: 'Courses', path: '/student/courses', icon: IconCourses },
    { label: 'Lessons', path: '/student/lessons', icon: IconModules },
    { label: 'Exams', path: '/student/exams', icon: IconExams },
    { label: 'Progress', path: '/student/progress', icon: IconQuestions },
    { label: 'Results', path: '/student/results', icon: IconUsers },
  ],
};

const Sidebar = ({ userRole, activeRoute, isMobileOpen, setMobileOpen }) => {
  const detectedRole = useMemo(() => {
    if (activeRoute.startsWith('/admin')) return 'Administrator';
    if (activeRoute.startsWith('/student')) return 'Student';
    return 'Instructor';
  }, [activeRoute]);

  const role = userRole || detectedRole;
  const links = useMemo(() => navLinks[role] || [], [role]);

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed z-50 flex h-full flex-col bg-black/80 backdrop-blur-lg transition-all duration-300 ease-in-out md:static
          ${isMobileOpen ? 'left-0 w-64' : 'left-[-100%] md:left-0 md:w-64'}
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        `}
      >
        {/* Logo + collapse toggle */}
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <h1
            className={`text-xl font-bold tracking-wide text-white transition-all ${
              isCollapsed ? 'hidden' : 'block'
            }`}
          >
            EduVerse
          </h1>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-red-500 transition-colors"
          >
            {isCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {links.map(({ label, path, icon: Icon }) => {
            const isActive = activeRoute === path;
            return (
              <Link
                key={label}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? 'bg-red-500/10 text-red-500 font-semibold border-l-2 border-red-500'
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-100 border-l-2 border-transparent'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        {!isCollapsed && (
          <div className="border-t border-gray-800 p-4 text-xs text-gray-500">
            <p>{role}</p>
            <p className="text-[10px]">Nothing OS Theme UI © 2025</p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
