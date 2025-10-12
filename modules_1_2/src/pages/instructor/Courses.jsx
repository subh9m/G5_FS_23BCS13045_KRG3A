import React from 'react';

// --- Icon Components ---
const IconPlus = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconEdit = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconDelete = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

// --- Mock Data ---
const mockCourses = [
  { id: 1, title: 'Advanced JavaScript', status: 'Published', students: 88 },
  { id: 2, title: 'React for Beginners', status: 'Published', students: 124 },
  { id: 3, title: 'Data Structures 101', status: 'Draft', students: 0 },
  { id: 4, title: 'Node.js Masterclass', status: 'Published', students: 44 },
];

const Courses = () => {
  const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        status === 'Published' ? 'bg-black/10 text-black' : 'bg-black/5 text-black/50'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">My Courses</h1>
          <p className="mt-1 text-black/60">Manage, edit, and create new courses.</p>
        </div>
        <button className="mt-4 sm:mt-0 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <IconPlus className="w-4 h-4" />
          Create Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="bg-white border border-black/10 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/5 text-xs text-black/60 uppercase tracking-wider">
              <tr>
                <th className="p-4">Course Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Enrolled Students</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {mockCourses.length > 0 ? (
                mockCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-black/5">
                    <td className="p-4 font-semibold">{course.title}</td>
                    <td className="p-4"><StatusBadge status={course.status} /></td>
                    <td className="p-4 text-black/70">{course.students}</td>
                    <td className="p-4">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-2 text-black/60 hover:text-black transition-colors" title="Edit Course"><IconEdit className="w-4 h-4" /></button>
                        <button className="p-2 text-black/60 hover:text-red-500 transition-colors" title="Delete Course"><IconDelete className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-black/50">
                    You haven't created any courses yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Courses;