import React from 'react';

// --- Icon Components (stroke inherits currentColor) ---
const IconPlus = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const IconEdit = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const IconDelete = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);


// --- Mock Data ---
const mockCourses = [
  { id: 1, title: 'Advanced JavaScript', status: 'Published', students: 88 },
  { id: 2, title: 'React for Beginners', status: 'Published', students: 124 },
  { id: 3, title: 'Data Structures 101', status: 'Draft', students: 0 },
  { id: 4, title: 'Node.js Masterclass', status: 'Published', students: 44 },
];

// --- Styled Components ---
const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 text-xs font-semibold rounded-full font-mono ${
      status === 'Published' 
        ? 'bg-red-500/10 text-red-500' 
        : 'bg-white/5 text-gray-400'
  }`}>
    {status}
  </span>
);

const Courses = () => {
  // This component is designed as a full-page view
  return (
    <div className="bg-black text-gray-200 font-sans min-h-screen p-6 md:p-10">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-100 font-mono tracking-wider">Courses Dashboard</h1>
            <p className="mt-2 text-gray-400">Manage all available courses.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2 border border-red-500 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500">
            <IconPlus className="w-4 h-4" />
            Create Course
          </button>
        </div>

        {/* Courses Table with Glassmorphism */}
        <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-black/40 text-xs text-gray-400 uppercase tracking-wider font-mono">
                <tr>
                  <th className="px-6 py-4">Course Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Enrolled</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCourses.length > 0 ? (
                  mockCourses.map((course) => (
                    <tr key={course.id} className="border-b border-[#333] last:border-b-0 hover:bg-white/5 transition-colors duration-300 ease-in-out">
                      <td className="px-6 py-4 font-semibold text-gray-100">{course.title}</td>
                      <td className="px-6 py-4"><StatusBadge status={course.status} /></td>
                      <td className="px-6 py-4 text-gray-300 font-mono">{course.students}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end items-center gap-2">
                          <button className="p-2 text-gray-400 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:bg-white/10" title="Edit Course">
                            <IconEdit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 rounded-full transition-all duration-300 ease-in-out hover:text-red-500 hover:bg-red-500/10" title="Delete Course">
                            <IconDelete className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-16 text-gray-500 font-mono tracking-wider">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;