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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* --- Modal Overlay --- */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* --- Modal Content --- */}
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out transform scale-95 opacity-0 animate-fade-in-scale">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-black/10">
          <h2 id="modal-title" className="text-lg font-bold text-black">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-black/60 rounded-full transition-colors hover:bg-black/10 hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close modal"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Modal Footer (Optional) */}
        {footer && (
          <div className="flex items-center justify-end p-4 space-x-3 bg-black/5 border-t border-black/10 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;