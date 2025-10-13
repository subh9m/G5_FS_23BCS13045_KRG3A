import React from 'react';

// --- Icon Components ---
const IconPlus = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconFile = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>;
const IconGrip = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle><circle cx="5" cy="5" r="1"></circle><circle cx="5" cy="12" r="1"></circle><circle cx="5" cy="19" r="1"></circle><circle cx="19" cy="5" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="19" cy="19" r="1"></circle></svg>;


// --- Mock Data ---
const courseData = {
  title: 'Advanced JavaScript',
  modules: [
    {
      id: 1, title: 'Module 1: Asynchronous JS',
      lessons: [{ id: 1, title: 'Callbacks & Promises' }, { id: 2, title: 'Async/Await' }]
    },
    {
      id: 2, title: 'Module 2: Modern ES Modules',
      lessons: [{ id: 3, title: 'Import/Export Syntax' }, { id: 4, title: 'Dynamic Imports' }]
    },
  ],
};

const ModuleCard = ({ module }) => (
  // Card with glassy background, border, and futuristic hover effects.
  <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
    {/* Module Header with mono font and themed border */}
    <div className="p-5 border-b border-[#333] flex items-center justify-between">
      <h3 className="font-semibold text-gray-200 font-mono tracking-wide">{module.title}</h3>
      <button className="text-gray-500 hover:text-red-500 cursor-grab transition-colors duration-300" title="Drag to reorder">
        <IconGrip className="w-5 h-5" />
      </button>
    </div>
    {/* Lessons List with hoverable items */}
    <div className="p-3 space-y-1">
      {module.lessons.map(lesson => (
        <div key={lesson.id} className="flex items-center p-3 rounded-lg transition-colors duration-300 hover:bg-white/5 group">
          <IconFile className="w-4 h-4 text-gray-400 group-hover:text-red-500 mr-4 transition-colors duration-300" />
          <span className="text-sm text-gray-300 group-hover:text-white">{lesson.title}</span>
        </div>
      ))}
    </div>
  </div>
);

const Modules = () => {
  return (
    <div className="space-y-8">
      {/* Header with responsive layout and themed typography */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100 font-mono tracking-wider">Course Modules</h1>
          <p className="mt-2 text-gray-400">Structure your course: <span className="font-semibold text-gray-300 font-mono">{courseData.title}</span></p>
        </div>
        <div className="flex items-center gap-3">
            {/* Secondary button style */}
            <button className="flex items-center justify-center gap-2 px-5 py-2 border border-[#333] text-gray-300 rounded-xl text-sm font-semibold hover:bg-white/5 hover:text-white transition-all duration-300 ease-in-out">
              Add Lesson
            </button>
            {/* Primary button style with red accent */}
            <button className="flex items-center justify-center gap-2 px-5 py-2 border border-red-500 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out">
              <IconPlus className="w-4 h-4" />
              Add Module
            </button>
        </div>
      </div>

      {/* Modules List with consistent spacing */}
      <div className="space-y-6">
        {courseData.modules.length > 0 ? (
          courseData.modules.map(module => <ModuleCard key={module.id} module={module} />)
        ) : (
          // Themed empty state placeholder
          <div className="text-center p-12 border-2 border-dashed border-[#333] rounded-2xl bg-black/20 text-gray-500">
            <p>No modules have been added to this course yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modules;