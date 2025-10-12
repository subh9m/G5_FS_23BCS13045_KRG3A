import React from 'react';
// Correct the import path to go up two directories to the src/ folder
import { useToast } from '../../components/common/Toast.jsx';

// --- Icon Components ---
const IconPlus = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconEdit = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconDelete = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

// --- Mock Data ---
const mockExams = [
    { id: 1, title: 'Midterm Exam', course: 'Advanced JavaScript', status: 'Published', date: '2025-10-25' },
    { id: 2, title: 'Final Assessment', course: 'React for Beginners', status: 'Published', date: '2025-11-15' },
    { id: 3, title: 'Quiz 1: Fundamentals', course: 'Data Structures 101', status: 'Draft', date: 'N/A' },
];

const Exams = () => {
    const showToast = useToast();

    const handleDelete = (examTitle) => {
      // In a real app, you would call an API here.
      console.log(`Deleting exam: ${examTitle}`);
      showToast(`Exam "${examTitle}" deleted successfully!`, 'success');
    };

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
                <h1 className="text-3xl font-bold text-black">Exams</h1>
                <p className="mt-1 text-black/60">Create and manage your course exams.</p>
            </div>
            <button className="mt-4 sm:mt-0 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <IconPlus className="w-4 h-4" />
                Create Exam
            </button>
        </div>

        {/* Exams Table */}
        <div className="bg-white border border-black/10 rounded-lg shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-black/5 text-xs text-black/60 uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Exam Title</th>
                            <th className="p-4">Course</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                    {mockExams.map((exam) => (
                        <tr key={exam.id} className="hover:bg-black/5">
                            <td className="p-4 font-semibold">{exam.title}</td>
                            <td className="p-4 text-black/70">{exam.course}</td>
                            <td className="p-4"><StatusBadge status={exam.status} /></td>
                            <td className="p-4 text-black/70">{exam.date}</td>
                            <td className="p-4">
                                <div className="flex justify-end items-center gap-2">
                                    <button className="p-2 text-black/60 hover:text-black transition-colors" title="Edit Exam"><IconEdit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(exam.title)} className="p-2 text-black/60 hover:text-red-500 transition-colors" title="Delete Exam"><IconDelete className="w-4 h-4" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default Exams;

