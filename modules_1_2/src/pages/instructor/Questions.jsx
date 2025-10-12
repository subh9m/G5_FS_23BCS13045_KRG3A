import React from 'react';

// --- Icon Components ---
const IconPlus = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconEdit = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconDelete = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

// --- Mock Data ---
const mockQuestions = [
  { id: 1, text: 'What is a JavaScript closure?', course: 'Advanced JavaScript', difficulty: 'Medium' },
  { id: 2, text: 'Explain the concept of "lifting state up" in React.', course: 'React for Beginners', difficulty: 'Easy' },
  { id: 3, text: 'What is the time complexity of a binary search algorithm?', course: 'Data Structures 101', difficulty: 'Medium' },
  { id: 4, text: 'How does the Node.js event loop work?', course: 'Node.js Masterclass', difficulty: 'Hard' },
];

const Questions = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Question Bank</h1>
          <p className="mt-1 text-black/60">Manage all your exam questions in one place.</p>
        </div>
        <button className="mt-4 sm:mt-0 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <IconPlus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <select className="w-full sm:w-auto px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>All Courses</option>
            <option>Advanced JavaScript</option>
        </select>
        <select className="w-full sm:w-auto px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
        </select>
      </div>

      {/* Questions Table */}
      <div className="bg-white border border-black/10 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/5 text-xs text-black/60 uppercase tracking-wider">
              <tr>
                <th className="p-4">Question</th>
                <th className="p-4">Course</th>
                <th className="p-4">Difficulty</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {mockQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-black/5">
                  <td className="p-4 font-semibold max-w-md truncate">{q.text}</td>
                  <td className="p-4 text-black/70">{q.course}</td>
                  <td className="p-4 text-black/70">{q.difficulty}</td>
                  <td className="p-4">
                    <div className="flex justify-end items-center gap-2">
                        <button className="p-2 text-black/60 hover:text-black transition-colors" title="Edit Question"><IconEdit className="w-4 h-4" /></button>
                        <button className="p-2 text-black/60 hover:text-red-500 transition-colors" title="Delete Question"><IconDelete className="w-4 h-4" /></button>
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

export default Questions;