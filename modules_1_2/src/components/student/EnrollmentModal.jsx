import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * A simple inline SVG loader for the confirmation button.
 */
const ButtonLoader = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


/**
 * EnrollmentModal: Confirmation modal for when a student tries to enroll in a course.
 */
const EnrollmentModal = ({ course, isOpen, onClose, onConfirm }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);

  if (!isOpen || !course) {
    return null;
  }

  const handleConfirm = async () => {
    setIsEnrolling(true);
    try {
      // The onConfirm function should handle showing success/error toasts.
      await onConfirm(course.id);
      onClose(); // Close modal on success
    } catch (error) {
      // The parent component's onConfirm function should catch this and show a toast.
      console.error('Enrollment failed:', error);
    } finally {
      setIsEnrolling(false);
    }
  };

  // Prevents closing when clicking inside the modal content
  const handleModalContentClick = (e) => e.stopPropagation();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Panel */}
      <div
        onClick={handleModalContentClick}
        className="relative bg-black/60 border border-[#333] rounded-2xl shadow-lg w-full max-w-md m-4 transform transition-all duration-300 ease-in-out"
        style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}
      >
        <div className="p-6 md:p-8 text-center space-y-6">
          <header>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Confirm Enrollment
            </h2>
          </header>

          <main>
            <p className="text-gray-300 font-light mb-2">
              Do you want to enroll in the following course?
            </p>
            <p className="text-xl font-mono text-red-500 tracking-wider">
              {course.title}
            </p>
          </main>

          <footer className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onClose}
              disabled={isEnrolling}
              className="w-full sm:w-auto border border-[#333] text-gray-300 px-8 py-2 rounded-xl text-sm font-semibold tracking-wider hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isEnrolling}
              className="w-full sm:w-auto flex items-center justify-center border border-red-500 text-red-500 px-8 py-2 rounded-xl text-sm font-semibold tracking-wider hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEnrolling ? <ButtonLoader /> : 'Confirm'}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

EnrollmentModal.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /**
   * Async function that resolves on success or rejects on failure.
   */
  onConfirm: PropTypes.func.isRequired,
};

export default EnrollmentModal;