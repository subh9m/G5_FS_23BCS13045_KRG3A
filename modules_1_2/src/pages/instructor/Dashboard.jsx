import React from 'react';

// --- Icon Components (stroke inherits currentColor) ---
const IconCourses = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);
const IconUsers = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const IconExams = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
  </svg>
);

// --- Mock Data ---
const stats = [
  { label: 'Total Courses', value: '12', icon: IconCourses },
  { label: 'Active Students', value: '256', icon: IconUsers },
  { label: 'Upcoming Exams', value: '3', icon: IconExams },
];

const recentEnrollments = [
  { student: 'Casey Jordan', course: 'Advanced JavaScript', date: '2025-10-12' },
  { student: 'Alex Smith', course: 'React for Beginners', date: '2025-10-11' },
  { student: 'Jordan Lee', course: 'Data Structures 101', date: '2025-10-11' },
  { student: 'Taylor Kim', course: 'Advanced JavaScript', date: '2025-10-10' },
  { student: 'Morgan Riley', course: 'Node.js Masterclass', date: '2025-10-09' },
];

// --- Styled Sub-components ---
const StatCard = ({ label, value, icon: Icon }) => (
  <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 flex items-center space-x-4 transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1">
    <div className="p-3 bg-white/5 rounded-full border border-[#333]">
      <Icon className="w-6 h-6 text-red-500" />
    </div>
    <div>
      <p className="text-3xl font-bold text-gray-100 font-mono">{value}</p>
      <p className="text-sm text-gray-400 uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    // Base container with themed background and padding.
    <div className="bg-black text-gray-200 font-sans min-h-screen w-full p-6 md:p-10">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Header with themed typography */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100 font-mono tracking-wider">Instructor Dashboard</h1>
          <p className="mt-2 text-gray-400">Welcome back, here's a summary of your activity.</p>
        </div>

        {/* Stats Cards with responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
        </div>

        {/* Recent Enrollments Table */}
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-100 font-mono tracking-wide">Recent Enrollments</h2>
            <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                <thead className="bg-black/40 text-xs text-gray-400 uppercase tracking-wider font-mono">
                    <tr>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4 text-right">Enrollment Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                    {recentEnrollments.map((enrollment, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors duration-300 ease-in-out">
                        <td className="px-6 py-4 font-semibold text-gray-200">{enrollment.student}</td>
                        <td className="px-6 py-4 text-gray-300">{enrollment.course}</td>
                        <td className="px-6 py-4 text-gray-300 text-right font-mono">{enrollment.date}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;