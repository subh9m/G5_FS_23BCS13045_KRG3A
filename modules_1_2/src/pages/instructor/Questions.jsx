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
    <div className="space-y-8">
      {/* Header with responsive layout and themed typography */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100 font-mono tracking-wider">Question Bank</h1>
          <p className="mt-2 text-gray-400">Manage all your exam questions in one place.</p>
        </div>
        {/* Primary button style with red accent */}
        <button className="flex items-center justify-center gap-2 px-5 py-2 border border-red-500 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out">
          <IconPlus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {/* Filters with themed styling */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <select className="w-full sm:w-auto px-4 py-2 bg-transparent border border-[#333] text-gray-300 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.2)] transition-all duration-300">
            <option>All Courses</option>
            <option>Advanced JavaScript</option>
        </select>
        <select className="w-full sm:w-auto px-4 py-2 bg-transparent border border-[#333] text-gray-300 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.2)] transition-all duration-300">
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
        </select>
      </div>

      {/* Questions Table inside a themed container with futuristic hover effects */}
      <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/40 text-xs text-gray-400 uppercase tracking-wider font-mono">
              <tr>
                <th className="px-6 py-4">Question</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockQuestions.map((q) => (
                <tr key={q.id} className="border-b border-[#333] last:border-b-0 hover:bg-white/5 transition-colors duration-300 ease-in-out">
                  <td className="px-6 py-4 font-semibold text-gray-200 max-w-md truncate">{q.text}</td>
                  <td className="px-6 py-4 text-gray-400">{q.course}</td>
                  <td className="px-6 py-4 text-gray-400">{q.difficulty}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end items-center gap-2">
                      <button className="p-2 text-gray-400 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:bg-white/10" title="Edit Question"><IconEdit className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 rounded-full transition-all duration-300 ease-in-out hover:text-red-500 hover:bg-red-500/10" title="Delete Question"><IconDelete className="w-4 h-4" /></button>
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