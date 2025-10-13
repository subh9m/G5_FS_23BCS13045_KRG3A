import React, { useEffect } from 'react';

// A simple 'X' icon for the close button
const IconX = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

/**
 * A generic, accessible modal component for popups.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {Function} props.onClose - Function to call when the modal should be closed.
 * @param {string} props.title - The title to display in the modal header.
 * @param {React.ReactNode} props.children - The content to render inside the modal body.
 * @param {React.ReactNode} props.footer - The content for the modal footer (usually action buttons).
 */
const Modal = ({ isOpen, onClose, title, children, footer }) => {
  // Effect to handle the 'Escape' key press for closing the modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    // Portal Root: Renders the modal at the top level of the DOM
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* --- Modal Overlay --- */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* --- Modal Content --- */}
      <div className="relative w-full max-w-lg bg-black/60 backdrop-blur-md border border-[#333] rounded-2xl transition-all duration-300 ease-in-out transform scale-95 opacity-0 animate-fade-in-scale">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333]">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-200 tracking-wide font-mono">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 rounded-full transition-all duration-300 ease-in-out hover:text-red-500 hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Close modal"
          >
            <IconX className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-gray-300 leading-relaxed">
          {children}
        </div>

        {/* Modal Footer (Optional) */}
        {footer && (
          <div className="flex items-center justify-end p-6 space-x-4 border-t border-[#333]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;