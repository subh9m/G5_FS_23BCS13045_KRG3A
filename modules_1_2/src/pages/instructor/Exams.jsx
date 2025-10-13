import React from 'react';

// --- Icon Components (stroke inherits currentColor) ---
const IconPlus = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconEdit = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconDelete = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

// --- Mock Data ---
const mockExams = [
    { id: 1, title: 'Midterm Exam', course: 'Advanced JavaScript', status: 'Published', date: '2025-10-25' },
    { id: 2, title: 'Final Assessment', course: 'React for Beginners', status: 'Published', date: '2025-11-15' },
    { id: 3, title: 'Quiz 1: Fundamentals', course: 'Data Structures 101', status: 'Draft', date: 'N/A' },
    { id: 4, title: 'Project Submission', course: 'Node.js Masterclass', status: 'Published', date: '2025-12-01' },
];

// --- Styled Sub-components ---
const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 text-xs font-semibold rounded-full font-mono ${
      status === 'Published' 
        ? 'bg-red-500/10 text-red-500' 
        : 'bg-white/5 text-gray-400'
  }`}>
    {status}
  </span>
);

const Exams = () => {
    const handleDelete = (examTitle) => {
        // In a real app, you would call an API here.
        // A toast notification could be shown on success.
        console.log(`Simulating delete for exam: ${examTitle}`);
    };

    return (
        <div className="bg-black text-gray-200 font-sans min-h-screen w-full p-6 md:p-10">
            <div className="w-full max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-100 font-mono tracking-wider">Exams</h1>
                        <p className="mt-2 text-gray-400">Create and manage your course exams.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-5 py-2 border border-red-500 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500">
                        <IconPlus className="w-4 h-4" />
                        Create Exam
                    </button>
                </div>

                {/* Exams Table */}
                <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-black/40 text-xs text-gray-400 uppercase tracking-wider font-mono">
                                <tr>
                                    <th className="px-6 py-4">Exam Title</th>
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#333]">
                                {mockExams.map((exam) => (
                                    <tr key={exam.id} className="hover:bg-white/5 transition-colors duration-300 ease-in-out">
                                        <td className="px-6 py-4 font-semibold text-gray-200">{exam.title}</td>
                                        <td className="px-6 py-4 text-gray-300">{exam.course}</td>
                                        <td className="px-6 py-4"><StatusBadge status={exam.status} /></td>
                                        <td className="px-6 py-4 text-gray-300 font-mono">{exam.date}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end items-center gap-2">
                                                <button className="p-2 text-gray-400 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:bg-white/10" title="Edit Exam">
                                                    <IconEdit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(exam.title)} className="p-2 text-gray-400 rounded-full transition-all duration-300 ease-in-out hover:text-red-500 hover:bg-red-500/10" title="Delete Exam">
                                                    <IconDelete className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
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

export default Exams;