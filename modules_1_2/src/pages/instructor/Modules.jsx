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
  <div className="bg-white border border-black/10 rounded-lg shadow-sm">
    {/* Module Header */}
    <div className="p-4 border-b border-black/10 flex items-center justify-between">
      <h3 className="font-bold text-black">{module.title}</h3>
      <button className="text-black/40 hover:text-black cursor-grab" title="Drag to reorder">
        <IconGrip className="w-5 h-5" />
      </button>
    </div>
    {/* Lessons List */}
    <div className="p-2 space-y-1">
      {module.lessons.map(lesson => (
        <div key={lesson.id} className="flex items-center p-3 rounded-md hover:bg-black/5">
          <IconFile className="w-4 h-4 text-black/60 mr-3" />
          <span className="text-sm text-black/80">{lesson.title}</span>
        </div>
      ))}
    </div>
  </div>
);

const Modules = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Course Modules</h1>
          <p className="mt-1 text-black/60">Structure your course: <span className="font-semibold">{courseData.title}</span></p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
           <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-black/20 text-black rounded-md text-sm font-semibold hover:bg-black/5 transition-colors">
              Add Lesson
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors">
              <IconPlus className="w-4 h-4" />
              Add Module
            </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {courseData.modules.length > 0 ? (
          courseData.modules.map(module => <ModuleCard key={module.id} module={module} />)
        ) : (
          <div className="text-center p-12 border-2 border-dashed border-black/10 rounded-lg text-black/50">
            <p>No modules have been added to this course yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// This line was missing, which caused the error.
export default Modules;
