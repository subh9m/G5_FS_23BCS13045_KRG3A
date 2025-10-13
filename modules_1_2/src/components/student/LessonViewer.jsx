import React, { useState } from 'react';
import PropTypes from 'prop-types';

// A simple progress bar component for module progress
const ModuleProgressTracker = ({ progress }) => (
  <div className="w-full my-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs font-mono text-gray-400 tracking-wider">Module Progress</span>
      <span className="text-sm font-mono text-white">{progress}%</span>
    </div>
    <div className="w-full bg-black border border-[#333] rounded-full h-2 overflow-hidden">
      <div
        className="bg-red-500 h-full rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

ModuleProgressTracker.propTypes = {
  progress: PropTypes.number.isRequired,
};

// Component to render the lesson content based on its type
const LessonContent = ({ lesson }) => {
  switch (lesson.type) {
    case 'video':
      return (
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden border border-[#333]">
          <iframe
            src={lesson.contentUrl}
            title={lesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      );
    case 'text':
      return (
        <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white max-w-none font-light leading-relaxed tracking-wide">
          {/* This is a placeholder. For a real app, you would use a library like 'react-markdown' to render markdown content. */}
          <h2>{lesson.title}</h2>
          <p>{lesson.content}</p>
          <p>This is where formatted text content, parsed from Markdown or HTML, would be displayed. It supports various elements like lists, links, and code blocks, all styled to fit the monochrome theme.</p>
        </div>
      );
    case 'pdf':
       return (
        <div className="w-full h-[70vh] bg-black rounded-xl overflow-hidden border border-[#333]">
           <iframe
            src={lesson.contentUrl}
            title={lesson.title}
            className="w-full h-full"
            frameBorder="0"
          ></iframe>
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center h-64 border border-dashed border-[#333] rounded-xl">
          <p className="text-gray-500 font-mono">Unsupported lesson format.</p>
        </div>
      );
  }
};

LessonContent.propTypes = {
  lesson: PropTypes.object.isRequired,
};


/**
 * LessonViewer: Displays the content of a selected lesson.
 */
const LessonViewer = ({ lesson, moduleProgress, onNext, onPrevious, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(lesson.isCompleted || false);

  const handleComplete = () => {
    onComplete(lesson.id);
    setIsCompleted(true);
  };

  return (
    <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 md:p-8 flex flex-col space-y-6 transition-all duration-500 ease-in-out">
      
      {/* Header: Breadcrumbs, Title, and Progress */}
      <header>
        <p className="text-xs font-mono text-gray-500 tracking-wider mb-2">
          Course Name → Module {lesson.moduleId}
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-wide">{lesson.title}</h1>
        <ModuleProgressTracker progress={moduleProgress} />
      </header>

      {/* Lesson Content Area */}
      <main className="flex-grow">
        <LessonContent lesson={lesson} />
      </main>

      {/* Footer: Navigation and Completion Button */}
      <footer className="pt-6 border-t border-[#333] flex flex-col md:flex-row justify-between items-center gap-4">
        <button
          onClick={onPrevious}
          className="w-full md:w-auto border border-[#333] text-gray-300 px-5 py-2 rounded-xl text-sm font-semibold tracking-wider hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300 ease-in-out"
        >
          Previous Lesson
        </button>
        
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`w-full md:w-auto px-6 py-2 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ease-in-out ${
            isCompleted
              ? 'bg-transparent border border-green-500 text-green-500 cursor-not-allowed'
              : 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]'
          }`}
        >
          {isCompleted ? 'Completed ✓' : 'Mark as Completed'}
        </button>

        <button
          onClick={onNext}
          className="w-full md:w-auto border border-red-500 text-red-500 px-5 py-2 rounded-xl text-sm font-semibold tracking-wider hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out"
        >
          Next Lesson
        </button>
      </footer>
    </div>
  );
};

LessonViewer.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['video', 'text', 'pdf']).isRequired,
    contentUrl: PropTypes.string, // Required for video/pdf
    content: PropTypes.string, // Required for text
    moduleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isCompleted: PropTypes.bool,
  }).isRequired,
  moduleProgress: PropTypes.number,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

LessonViewer.defaultProps = {
  moduleProgress: 0,
};

export default LessonViewer;