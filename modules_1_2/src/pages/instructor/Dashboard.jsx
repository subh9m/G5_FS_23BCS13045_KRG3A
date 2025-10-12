import React from 'react';

// --- Icon Components ---
const IconCourses = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const IconUsers = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconExams = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>;

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
];

const Dashboard = () => {
  const StatCard = ({ label, value, icon: Icon }) => (
    <div className="bg-white p-6 border border-black/10 rounded-lg flex items-center space-x-4">
      <div className="p-3 bg-black/5 rounded-full">
        <Icon className="w-6 h-6 text-black" />
      </div>
      <div>
        <p className="text-3xl font-bold text-black">{value}</p>
        <p className="text-sm text-black/60">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Instructor Dashboard</h1>
        <p className="mt-1 text-black/60">Welcome back, here's a summary of your activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
      </div>

      {/* Recent Enrollments Table */}
      <div>
        <h2 className="text-xl font-bold text-black mb-4">Recent Enrollments</h2>
        <div className="bg-white border border-black/10 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-black/5 text-xs text-black/60 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Course</th>
                  <th className="p-4 text-right">Enrollment Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {recentEnrollments.map((enrollment, index) => (
                  <tr key={index} className="hover:bg-black/5">
                    <td className="p-4 font-semibold">{enrollment.student}</td>
                    <td className="p-4 text-black/70">{enrollment.course}</td>
                    <td className="p-4 text-black/70 text-right">{enrollment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;