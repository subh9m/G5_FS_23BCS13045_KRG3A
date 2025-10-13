import React from 'react';
import PropTypes from 'prop-types';

// A simple progress bar component styled for the theme
const ProgressTracker = ({ progress }) => (
  <div className="px-6 pb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs font-mono text-gray-400 tracking-wider">Progress</span>
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

ProgressTracker.propTypes = {
  progress: PropTypes.number.isRequired,
};


/**
 * CourseCard: Displays a course overview card for a student.
 * Used in the Courses or Dashboard pages.
 */
const CourseCard = ({ course, isEnrolled, progress, onEnroll, onContinue, onViewDetails }) => {
  const { title, description, instructorName, thumbnail } = course;

  // Fallback image if a thumbnail isn't provided
  const coverImage = thumbnail || 'https://via.placeholder.com/400x225/0a0a0a/333333?text=COURSE';

  return (
    <div className="bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl flex flex-col overflow-hidden group hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
      
      {/* Course Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={coverImage}
          alt={`Cover image for ${title}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Course Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white tracking-wide mb-2">{title}</h3>
        {instructorName && (
          <p className="text-xs text-gray-500 font-mono tracking-wider mb-4">
            Instructor: {instructorName}
          </p>
        )}
        <p className="text-gray-400 text-sm font-light leading-relaxed flex-grow">
          {description}
        </p>
      </div>

      {/* Progress Tracker (if enrolled) */}
      {isEnrolled && <ProgressTracker progress={progress} />}

      {/* Action Buttons */}
      <div className="p-6 border-t border-[#333] flex flex-col sm:flex-row items-center justify-between gap-4">
        {isEnrolled ? (
          <button
            onClick={onContinue}
            className="w-full sm:w-auto border border-red-500 text-red-500 px-5 py-2 rounded-xl text-sm font-semibold tracking-wider hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={onEnroll}
            className="w-full sm:w-auto border border-red-500 text-red-500 px-5 py-2 rounded-xl text-sm font-semibold tracking-wider hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out"
          >
            Enroll
          </button>
        )}
        <button
          onClick={onViewDetails}
          className="w-full sm:w-auto border border-[#333] text-gray-300 px-5 py-2 rounded-xl text-sm font-semibold tracking-wider hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300 ease-in-out"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    instructorName: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
  isEnrolled: PropTypes.bool,
  progress: PropTypes.number,
  onEnroll: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

CourseCard.defaultProps = {
  isEnrolled: false,
  progress: 0,
};

export default CourseCard;